export function getGreeting(firstName?: string | null): string {
  if (firstName && firstName.trim() !== '') {
    return `Hey ${firstName.trim()},`;
  }
  return 'Hey,';
}

export const EMAIL_TEMPLATES = {
  sequenceA: {
    email1: {
      subject: 'after the click',
      body: `{{GREETING}}

Most brands we audit are losing 20–30% of their buyers *after* the click — checkout friction, dead-end thank-you pages, follow-ups that never fire.

The ad account looks healthy. The funnel is where the money quietly walks out.

Worth a look at your own numbers post-click. Most founders have never mapped it.

Jarred Letofsky
https://pivotaltimes.io`
    },
    email2: {
      subject: 'Re: after the click',
      body: `{{GREETING}}

Bubbling this up.

When growth stalls, the instinct is to raise ad spend. But pouring more traffic into a leaking funnel just means renting revenue at worse margins every month.

We seal the leaks first — the exact process is at the link below if you want to see how we map it.

Jarred Letofsky
https://pivotaltimes.io`
    },
    email3: {
      subject: 'timing',
      body: `{{GREETING}}

Timing's clearly off, so I'll leave it here.

If conversion ever becomes the bottleneck — it usually does before ad costs stop climbing — the full breakdown of how we find and seal funnel leaks is below.

Jarred Letofsky
https://pivotaltimes.io`
    }
  },
  sequenceB: {
    email1: {
      subject: 'backend vs. front end',
      body: `{{GREETING}}

A pattern we see constantly: top-of-funnel scales, the backend doesn't. Traffic doubles, but the pages, offers, and follow-up sequences underneath were built for a company half the size.

The result is ad spend working harder to push buyers through a funnel that's dropping more of them than it did a year ago.

If you haven't stress-tested yours since traffic grew, it's probably happening to you too.

Jarred Letofsky
https://pivotaltimes.io`
    },
    email2: {
      subject: 'Re: backend vs. front end',
      body: `{{GREETING}}

Quick follow-up.

Most of the brands we work with came to us wanting more traffic. What they actually needed was to stop losing the traffic they'd already paid for — same spend, meaningfully better margins.

How we map the drop-off points is laid out at the link below.

Jarred Letofsky
https://pivotaltimes.io`
    },
    email3: {
      subject: 'closing the loop',
      body: `{{GREETING}}

Assuming this isn't a priority right now — no problem, I'll close the loop.

If you ever want to know exactly where revenue is slipping out of your funnel, you know where to find us.

Jarred Letofsky
https://pivotaltimes.io`
    }
  },
  sequenceC: {
    email1: {
      subject: 'cheaper than more ads',
      body: `{{GREETING}}

Quick math most founders never run: lifting funnel conversion from 2% to 2.5% is the same revenue as buying 25% more traffic — except one costs a fix and the other costs that much more ad spend, forever.

Almost everyone defaults to buying the traffic.

Jarred Letofsky
https://pivotaltimes.io`
    },
    email2: {
      subject: 'Re: cheaper than more ads',
      body: `{{GREETING}}

One more on this.

The conversion lift is almost always sitting in places nobody owns — the step between opt-in and offer, the abandoned checkout that gets one weak email, the mobile page nobody's tested since launch.

Finding those is literally all we do. Process is at the link below.

Jarred Letofsky
https://pivotaltimes.io`
    },
    email3: {
      subject: 'last one',
      body: `{{GREETING}}

I'll stop here.

If ad costs keep climbing and margins keep thinning, the fix usually isn't more spend — it's the funnel. When you're ready to map yours, the link below is where to start.

Jarred Letofsky
https://pivotaltimes.io`
    }
  }
};
