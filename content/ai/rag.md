---
title: "What is RAG?"
description: "An architectural overview of Retrieval-Augmented Generation: embeddings, chunking and context augmentation."
category: "AI"
slug: "rag"
date: "2026-09-22"
---

## What is RAG?

Retrieval-Augmented Generation gives a language model relevant documents at question time instead of relying only on what it memorized during training. That makes answers easier to ground in your own, up-to-date data.

## The pipeline

1. **Ingest** — split documents into chunks.
2. **Embed** — convert each chunk to a vector and store it in a vector index.
3. **Retrieve** — embed the user's question and fetch the most similar chunks.
4. **Generate** — put those chunks in the prompt and ask the model to answer from them.

## Chunking

Chunks that are too large dilute relevance; chunks that are too small lose context. Start with a few hundred tokens and some overlap between neighbours, then tune against real questions.

## Limits to keep in mind

- Retrieval quality caps answer quality: if the right chunk is not retrieved, the model cannot use it.
- The model can still ignore or misread the context, so instruct it to say when the answer is not in the sources.
- Evaluate retrieval and generation separately.
