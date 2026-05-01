---
title: "Proving You Own a Wallet Without Showing It: A zk-SNARK Primer"
date: "2026-04-12"
excerpt: "Zero-knowledge proofs let you assert facts about a secret without revealing the secret itself. Here's what I learned building a Groth16 wallet verifier."
tags: ["Cryptography", "Blockchain", "zk-SNARKs"]
cover: ""
---

I spent the better part of a month building a zero-knowledge wallet verifier — a small Solidity and JavaScript prototype that lets a user prove they own a wallet (and that it holds at least *X* tokens) without revealing the wallet address, balance, or private key. This post is the explanation I wish I'd had when I started.

## The setup

The classic on-chain identity check works like this: you sign a message with your private key, the contract recovers your public address from the signature, and it looks up your balance. Simple, battle-tested — and *deeply* leaky. Anyone who watches the chain learns your address, your holdings, your trading history, and every protocol you've touched.

What we actually want is a way to say:

> "I am a person who controls **some** wallet that satisfies condition C."

Without saying *which* wallet.

## Enter zk-SNARKs

A SNARK (Succinct Non-interactive ARgument of Knowledge) lets a *prover* convince a *verifier* that they know a witness `w` satisfying some predicate `P(x, w)` — where `x` is public and `w` is private — and the verifier learns nothing about `w` beyond the fact that the predicate holds.

Concretely with Groth16 (the variant I used):

1. The predicate is compiled into an arithmetic circuit.
2. A trusted setup produces a proving key and a verifying key.
3. The prover runs the circuit with their secret inputs and produces a ~200-byte proof.
4. The verifier checks the proof against the public inputs in constant time (~3 elliptic curve pairings).

The verifier doesn't learn the witness. It only learns: *the prover knew one*.

## What the circuit actually checks

For wallet verification, the predicate roughly says:

```text
Given:
  public:  challenge_hash, balance_threshold, merkle_root
  private: address, signature, balance, merkle_path

Assert:
  1. ECDSA.verify(address, challenge_hash, signature) == true
  2. balance >= balance_threshold
  3. MerkleVerify(address, balance, merkle_path, merkle_root) == true
```

The Merkle root is a public commitment to a snapshot of all wallet balances (think of it as a compressed view of the chain state). The proof asserts: *somewhere in this snapshot, there's a wallet I control whose balance clears the threshold.*

The verifier never sees the address. They never see the balance. They just learn: "yes, this person passes."

## What I got wrong on the first try

ECDSA inside a SNARK is brutal. The secp256k1 curve isn't SNARK-friendly, and constraint counts explode quickly. My first circuit ran for about 40 minutes per proof on a laptop — completely unusable. The fix was to switch the in-circuit signature scheme to EdDSA over a SNARK-friendly curve and bridge to ECDSA at the application layer.

Lesson: **the cost of a SNARK is set by the worst primitive you put inside it.** Pick your gadgets carefully.

## Where this is going

I think the long-term shape of on-chain identity is something like: most interactions happen through proofs, not addresses. Your wallet is a private object. The chain only learns predicates you choose to disclose. The fact that this is technically achievable today, with reasonable performance, on commodity hardware — that still surprises me every time I run the verifier.

If you want to play with the code, the prototype is on my GitHub. It's rough, but it works.
