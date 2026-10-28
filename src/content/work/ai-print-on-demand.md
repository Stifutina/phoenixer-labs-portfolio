---
title: "AI art generator for print-on-demand"
owner: sergey
summary: "Six months on a store where shoppers describe a design, an image model draws it, and it becomes a real Shopify product printed through Printify."
when: 6 months
role: "Full-stack engineer"
area: ai
also: [backend]
stack: [Node.js, OpenAI API, MongoDB, AWS Lambda, Shopify API, Printify API]
cover: ../../assets/work/ai-print-on-demand/02.jpg
coverAlt: "Storefront pages of the colorful print-on-demand collection"
gallery:
  - src: ../../assets/work/ai-print-on-demand/01.jpg
    alt: "Mobile and desktop layouts of the store"
coverFocus: left center
order: 3
---

A print-on-demand shop with a twist: the customer types a prompt, the AI draws the artwork, and a few seconds later it's a t-shirt, badge or poster they can buy.

## What I built

- **Automation between Printify and Shopify**, so every generated design turns into a fully configured product with variants, mockups and prices.
- **Sync between Shopify products and AI images**, keeping catalog, artwork and print files consistent when either side changes.
- **Product generation from user prompts**, from the OpenAI call to a published listing.
