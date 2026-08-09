---
layout: project
title: "ATM Management System"
description: "Python ATM simulator with facial recognition as a biometric authentication layer, built with Tkinter, OpenCV, and MySQL."
category: "Software & ML"
tags: [Python, OpenCV, Tkinter, MySQL, Computer Vision, Biometrics]
link: "https://github.com/devesh-b/ATM-Management"
---

## Overview

A desktop ATM simulation that replaces the standard PIN with **facial recognition** as the primary authentication factor. Built in Python with Tkinter for the GUI, OpenCV for face detection and recognition, and MySQL for account and transaction persistence.

Source: [github.com/devesh-b/ATM-Management](https://github.com/devesh-b/ATM-Management)

---

## Authentication flow

<figure>
<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;font-family:monospace;font-size:11px;" aria-label="Facial recognition ATM authentication flow">
  <!-- Step 1 -->
  <rect x="20" y="60" width="95" height="70" rx="4" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.48"/>
  <text x="67" y="88" text-anchor="middle" fill="currentColor" opacity="0.52" font-size="10">Card</text>
  <text x="67" y="102" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="9">Insert / ID</text>
  <text x="67" y="116" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="8">account lookup</text>
  <line x1="115" y1="95" x2="148" y2="95" stroke="currentColor" stroke-width="1.2" opacity="0.35"/>
  <polygon points="145,91 153,95 145,99" fill="currentColor" opacity="0.35"/>

  <!-- Step 2 -->
  <rect x="153" y="60" width="95" height="70" rx="4" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5" opacity="0.56"/>
  <text x="200" y="86" text-anchor="middle" fill="currentColor" opacity="0.58" font-size="10">Webcam</text>
  <text x="200" y="100" text-anchor="middle" fill="currentColor" opacity="0.40" font-size="9">Capture</text>
  <text x="200" y="114" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="8">live frame</text>
  <line x1="248" y1="95" x2="278" y2="95" stroke="currentColor" stroke-width="1.2" opacity="0.32"/>
  <polygon points="275,91 283,95 275,99" fill="currentColor" opacity="0.32"/>

  <!-- Step 3 -->
  <rect x="283" y="60" width="95" height="70" rx="4" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5" opacity="0.52"/>
  <text x="330" y="86" text-anchor="middle" fill="currentColor" opacity="0.55" font-size="10">Face</text>
  <text x="330" y="100" text-anchor="middle" fill="currentColor" opacity="0.38" font-size="9">Detect</text>
  <text x="330" y="114" text-anchor="middle" fill="currentColor" opacity="0.26" font-size="8">Haar cascade</text>
  <line x1="378" y1="95" x2="408" y2="95" stroke="currentColor" stroke-width="1.2" opacity="0.30"/>
  <polygon points="405,91 413,95 405,99" fill="currentColor" opacity="0.30"/>

  <!-- Step 4 -->
  <rect x="413" y="60" width="95" height="70" rx="4" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-width="1.5" opacity="0.48"/>
  <text x="460" y="86" text-anchor="middle" fill="currentColor" opacity="0.50" font-size="10">Match</text>
  <text x="460" y="100" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="9">vs DB embed.</text>
  <text x="460" y="114" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="8">threshold check</text>

  <!-- Outcomes -->
  <line x1="508" y1="80" x2="560" y2="60" stroke="currentColor" stroke-width="1.1" opacity="0.38"/>
  <rect x="560" y="44" width="80" height="28" rx="3" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.42"/>
  <text x="600" y="62" text-anchor="middle" fill="currentColor" opacity="0.48" font-size="9">✓ GRANTED</text>
  <text x="600" y="74" text-anchor="middle" fill="currentColor" opacity="0.28" font-size="8">→ menu</text>

  <line x1="508" y1="110" x2="560" y2="130" stroke="currentColor" stroke-width="1.1" opacity="0.28"/>
  <rect x="560" y="118" width="80" height="28" rx="3" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.30"/>
  <text x="600" y="136" text-anchor="middle" fill="currentColor" opacity="0.35" font-size="9">✗ DENIED</text>
  <text x="600" y="148" text-anchor="middle" fill="currentColor" opacity="0.22" font-size="8">retry / lock</text>

  <text x="350" y="185" text-anchor="middle" fill="currentColor" opacity="0.24" font-size="10">Face embedding stored per account in MySQL — no PIN stored or transmitted</text>
</svg>
</figure>

---

## System design

**Authentication pipeline:**

1. Account number identifies the user record in MySQL, retrieving the stored face embedding
2. OpenCV Haar cascade locates the face region in the live webcam frame
3. The face region is passed through a face recogniser (LBPH or eigenface) to produce a live embedding
4. Euclidean distance between the live and stored embedding is compared against a tunable threshold — below threshold grants access, above threshold denies

The **false accept rate (FAR)** and **false reject rate (FRR)** trade off against the threshold value. A lower threshold is stricter (lower FAR, higher FRR). The threshold is a runtime configuration parameter rather than a hard-coded value.

**ATM operations:**

- Balance inquiry
- Cash withdrawal (validates sufficient funds, logs the transaction)
- Deposit (updates balance, logs amount)
- Mini-statement (retrieves last N transactions from the transaction history table)
- Session logout (biometric session cleared)

**Data layer:**

```sql
-- account table
CREATE TABLE accounts (
  account_id   BIGINT PRIMARY KEY,
  owner_name   VARCHAR(100),
  balance      DECIMAL(12,2),
  face_embed   BLOB           -- serialised numpy array
);

-- transaction log
CREATE TABLE transactions (
  txn_id       INT AUTO_INCREMENT PRIMARY KEY,
  account_id   BIGINT,
  type         ENUM('WITHDRAW','DEPOSIT','BALANCE'),
  amount       DECIMAL(12,2),
  timestamp    DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY  (account_id) REFERENCES accounts(account_id)
);
```

Parameterised queries throughout — no string interpolation for user-supplied values, guarding against SQL injection.

---

## GUI

Built in **Tkinter** with a state-machine layout manager: screens are swapped in and out based on authentication state. The main states are: `IDLE → CARD_INSERT → FACE_AUTH → MENU → [WITHDRAW | DEPOSIT | BALANCE | STATEMENT] → LOGOUT`.

Each screen transition validates that the session state permits the transition — preventing, for example, navigating directly to the withdraw screen without completing the authentication step.
