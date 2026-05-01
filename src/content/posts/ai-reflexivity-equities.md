---
title: "When Models Agree Too Much: Measuring AI Reflexivity in US Equities"
date: "2026-03-02"
excerpt: "If thousands of independently trained ML models all converge on the same trades, the market starts trading itself. I tried to measure how often this happens."
tags: ["Markets", "Machine Learning", "Research"]
cover: ""
---

George Soros's theory of reflexivity says markets aren't passive observers of fundamentals — participants' beliefs *change* the fundamentals they're trying to forecast. The classic example is a momentum loop: prices rise, traders chase, prices rise more, until the loop snaps.

What happens when most of the "traders" are machine-learning models trained on overlapping data, with overlapping features, by quants who all read the same papers?

That was the question behind my working paper on **Residual Multi-Factor Consensus (RMFC)** — an attempt to build an *ex-ante* measure of algorithmic crowding in US equities, before the unwind.

## The setup

The dataset:
- **3,669 US stocks**, 2000–2024
- **153 factors** from the Jensen–Kelly–Pedersen (JKP) global factor library
- A panel of independently trained ML models (gradient-boosted trees, random forests, simple neural nets) using random feature subsets and bootstrap samples

For each stock and each month, I asked: across all these independently trained models, how concentrated are the predicted return rankings? If models disagree, the market is doing its job — many views, many trades, prices reflect a synthesis. If models all agree, you've got a crowded trade waiting to unwind.

## What "consensus" means here

The naive measure — "average pairwise correlation of model predictions" — picks up too much shared variance from the underlying factors themselves. Two models trained on momentum will agree even if they're not really "the same model."

So the measure has to be *residualized*: strip out the variance explained by the standard factor exposures (size, value, momentum, profitability, investment, etc.), and ask whether the *residual* predictions still cluster. That residual cluster is what I'm calling consensus — and it's the part most likely to reflect genuinely shared model behavior rather than shared theory.

## The interesting result

Once you have the consensus series, you can ask the obvious question: does it Granger-cause realized volatility?

The answer, with a p-value of **0.037** at a 1-month horizon, is yes — consensus today predicts vol tomorrow, even after controlling for past vol, VIX, and macro variables. That's not a huge effect size, but it's real, and it's directional in the way reflexivity theory predicts: more agreement → more fragility.

## What I'm not claiming

This is a working paper, and I'm being careful:

- It's correlation in time, not a causal experiment.
- The factor library is not the universe of features real quants use — proprietary data could move the picture.
- "Consensus" is a feature of *this* model panel, not a guarantee about real-world fund positioning.

But the direction is suggestive. And it lines up with intuitions a lot of practitioners have voiced: as ML eats more of the buy side, the *cross-sectional dispersion* of trades shrinks, and the system gets more brittle in ways the standard factor models don't capture.

## Why this matters past the academic point

If you believe the result, then "AI in markets" isn't just a productivity story. It's a *systemic risk* story. Two questions worth chewing on:

1. Should regulators measure model-population diversity the way they measure capital adequacy?
2. Is there a market structure equivalent of antitrust — not for firms, but for *features and architectures*?

I don't have answers. But I'm increasingly convinced these are the right questions.
