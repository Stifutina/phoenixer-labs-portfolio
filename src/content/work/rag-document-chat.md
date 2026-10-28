---
title: "Document chat with a LoRA-tuned Qwen3"
owner: anastasia
summary: "Chat with any PDF or text file. Answers come only from the document, with page numbers, and the model says so when the answer isn't there."
when: 2026
role: "AI/ML engineer, full-stack developer"
area: ai
also: [frontend]
stack: [Qwen3-4B, LoRA, Unsloth, PEFT, TRL, bge-m3, Gradio, Hugging Face ZeroGPU, Python, React, TypeScript]
cover: ../../assets/work/rag-document-chat/up-01.jpg
coverAlt: "Start screen of the document chat next to a highlighted policy passage and its answer"
coverFocus: left center
featured: 4
size: wide
layout: case
glow: "#5b8def"
order: 11
live: "https://rag-document-assistant-xi.vercel.app/"
links:
  - label: "Model on Hugging Face"
    href: "https://huggingface.co/anastasianaydenko/qwen3-4b-smart-rag-lora"
  - label: "Gradio Space"
    href: "https://huggingface.co/spaces/anastasianaydenko/gradio-zerogpu-smart-rag"
gallery:
  - src: ../../assets/work/rag-document-chat/up-02.jpg
    alt: "Document upload with the answer settings"
  - src: ../../assets/work/rag-document-chat/up-03.jpg
    alt: "The pipeline status while a PDF is parsed, chunked and embedded"
  - src: ../../assets/work/rag-document-chat/up-04.jpg
    alt: "A chat answer citing the page it came from"
  - src: ../../assets/work/rag-document-chat/up-05.jpg
    alt: "The chat in dark mode answering a question about an uploaded PDF"
---

Upload a PDF or a text file and ask it questions. Every answer is built from passages retrieved from that document, cites the page, follows the document's language (English, Ukrainian or Russian) and admits when the document doesn't say.

## Fine-tuning

I fine-tuned Qwen3-4B with LoRA for grounded question answering using Unsloth, PEFT and TRL, then ran a before-and-after evaluation against the base model to check the tuning actually helped.

## The pipeline

PDF parsing, chunking, bge-m3 embeddings, vector search, chat memory, and user feedback fed back in as in-context examples. The model runs as a Gradio API on Hugging Face ZeroGPU with the adapter hosted on the Hub; the front end is React and TypeScript.

The demo runs on free GPU hardware, so the first question after a quiet spell can take a few minutes while the server wakes up.
