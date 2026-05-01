---
title: "Why Healthcare Models Have to Explain Themselves"
date: "2026-01-18"
excerpt: "Accuracy is necessary, not sufficient. A model that can't tell a clinician why it flagged a tumor is a model the clinician shouldn't trust."
tags: ["Healthcare", "Machine Learning", "Ethics"]
cover: ""
---

In late 2023 I co-authored a paper at ACIT on explainable AI for healthcare. The premise was simple: medical models keep posting state-of-the-art accuracy numbers on benchmark datasets, and adoption is still glacial. Why?

The short answer: **clinicians are not allowed to trust black boxes**, and they shouldn't be.

## What "explainable" actually has to mean

In a tech-Twitter sense, "explainability" usually means a heatmap. The model classified this chest X-ray as pneumonia; here's a Grad-CAM showing which pixels mattered. Useful, but insufficient. A clinician needs three things from an explanation:

1. **Locality** — what specifically in *this* image (or *this* patient's history) drove the call?
2. **Generality** — does the feature the model is using correspond to something pathophysiologically meaningful, or is it leaking from artifacts (scanner type, patient positioning, scan-room demographics)?
3. **Counterfactuals** — what would have to change for the prediction to flip?

A heatmap gives you (1). It doesn't give you (2) or (3). And without (2) and (3), the explanation is decorative.

## The accuracy–interpretability frontier isn't fixed

A common framing is that there's an unavoidable trade-off: linear models are interpretable but weak; deep nets are accurate but opaque; pick your poison.

In practice, the frontier is much more flexible than that:

- **Sparse, monotonic gradient-boosted trees** can match deep nets on tabular medical data while remaining inspectable per-feature.
- **Concept bottleneck models** force a deep net to route its prediction through a layer of human-named medical concepts ("ground-glass opacity," "consolidation"), so explanations are in clinical vocabulary.
- **Prototype networks** classify by similarity to training examples a clinician can pull up and look at.

The trade-off exists, but you can usually buy a lot of interpretability for very little accuracy if you design for it from the start, instead of bolting on SHAP at the end.

## The piece I keep coming back to

The deepest version of this problem isn't technical. It's about the *locus of responsibility*.

When a clinician makes a wrong call, there's a well-developed system — review boards, malpractice law, professional norms — for assigning and absorbing that responsibility. When a model makes a wrong call, that machinery doesn't exist yet. And so a clinician using a black-box model is being asked to *personally* underwrite a recommendation they cannot interrogate.

You can't fix that with better algorithms. You fix it by building models the clinician can argue with.

That, I think, is the real bar for healthcare AI: not "is it accurate," but "can a thoughtful doctor disagree with it for a stated reason."

We're not there yet. But we're closer than the doom narrative suggests.
