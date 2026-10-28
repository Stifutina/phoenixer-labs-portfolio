---
title: "Support ticket board with a model I trained"
owner: anastasia
summary: "A support inbox that sorts customer messages into columns with my own fine-tuned DistilBERT, in English, Russian and Ukrainian. No third-party AI API."
when: 2026
role: "Designer, web developer, ML model trainer"
area: ai
also: [frontend]
stack: [DistilBERT, Python, Hugging Face Transformers, React, TypeScript, Cloudflare Workers, Cloudflare Containers]
cover: ../../assets/work/ai-ticket-board/up-01.jpg
coverAlt: "The ticket board setup screen with the list of support columns"
coverFocus: 60% center
featured: 3
size: wide
layout: case
glow: "#8f9cff"
order: 10
live: "https://support-ticket-board.vercel.app/"
gallery:
  - src: ../../assets/work/ai-ticket-board/up-02.jpg
    alt: "The board with tickets sorted into billing, delivery, returns and technical columns"
  - src: ../../assets/work/ai-ticket-board/up-03.jpg
    alt: "A ticket opened next to the board, with the model’s category and confidence"
  - src: ../../assets/work/ai-ticket-board/up-04.jpg
    alt: "The board with a low-confidence ticket flagged for a human"
  - src: ../../assets/work/ai-ticket-board/up-05.jpg
    alt: "Training run statistics for the DistilBERT classifier"
  - src: ../../assets/work/ai-ticket-board/up-06.jpg
    alt: "The classifier API response in a terminal"
---

Customer messages land in columns by themselves: billing, delivery, returns, technical issues, needs a human, and positive feedback. The business picks its type (online store, software product, delivery service) and keeps only the columns it needs; everything else falls into Other.

## The model

The AI is my own work. I fine-tuned a DistilBERT classifier on support messages in English, Russian and Ukrainian, and it scores over 80% accuracy on messages it never saw in training. Tickets the model is unsure about are flagged for a person instead of being filed wrong.

## The product

I designed the interface, built the React and TypeScript app, and deployed the model as an API on Cloudflare, a Worker in front of a Container. There is no third-party AI API behind it, so customer messages never go to an outside AI provider.
