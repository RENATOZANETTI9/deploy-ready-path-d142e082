

## New Feature: Phone Verification Screen (WhatsApp Selection)

### What We're Building

A new intermediate screen that appears **after the user confirms their PIX key** and **before the loading/countdown screen**. This screen displays phone numbers retrieved from the Lemitt integration and asks the user to confirm which one is their WhatsApp number, framed as an LGPD security verification step.

### Flow Change

```text
Current:  PIX Selection → Loading/Countdown → Proposals
New:      PIX Selection → WhatsApp Verification → Loading/Countdown → Proposals
```

### How It Works

1. When the user confirms their PIX key, instead of going straight to the loading screen, we first call a **new webhook** to fetch phone numbers associated with the CPF from Lemitt.
2. Display a security-themed screen showing:
   - A shield/lock icon with "Verificação de Segurança" header
   - Text: "Para garantir que é realmente você realizando a consulta, qual desses números é seu WhatsApp?"
   - Warning text: "Fique atento em escolher o WhatsApp correto, pois enviamos validação para respeitar a LGPD."
   - Phone numbers displayed as selectable cards/boxes
   - An option "Nenhum desses é meu WhatsApp atual" that reveals an input field for manual entry
3. After selection, proceed to the existing loading/countdown flow (calling `/webhook/propostas`).

### Technical Steps

**1. Create `PhoneVerificationStep` component** (`src/components/steps/PhoneVerificationStep.tsx`)
- Receives `cpf`, `onConfirm(whatsapp)`, `onBack` as props
- On mount, calls a webhook (e.g., `https://webhook.vpslegaleviver.shop/webhook/buscar_telefones`) with `{ cpf }` to fetch phone numbers
- Shows a loading spinner while fetching
- Renders phone numbers as styled selectable cards (masked partially for security, e.g., `(11) 9****-1234`)
- Includes a "Nenhum desses" option that reveals a manual input field
- Confirm button styled consistently with the existing CTA pattern (gradient, glow, arrow)

**2. Modify `PixStep.tsx`**
- Add a new state phase: after PIX is confirmed, show the `PhoneVerificationStep` instead of immediately calling `submitPixData`
- Store the selected WhatsApp number
- After phone is confirmed, proceed with `submitPixData` as before
- Include the WhatsApp number in the `/webhook/propostas` payload

**3. Webhook Integration**
- New webhook endpoint needed: `POST /webhook/buscar_telefones` with body `{ cpf }` — expected to return an array of phone numbers from Lemitt
- The selected WhatsApp will also be sent along with the proposals request

### UI Design
- Shield icon with pulsing animation (matching existing icon patterns)
- High-contrast badge header: "Verificação de Segurança"
- Phone cards with radio-style selection, highlighted border when selected
- Manual input with phone formatting (matching existing `formatPhone` patterns)
- Same CTA button style as other steps

