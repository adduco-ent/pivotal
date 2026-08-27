export function getGreeting(firstName?: string | null): string {
  if (firstName && firstName.trim() !== '') {
    return `Hey ${firstName.trim()},`;
  }
  return 'Hey,';
}

export const EMAIL_TEMPLATES = {
  sequenceA: {
    email1: {
      subject: 'quick question',
      body: `{{GREETING}}

Are you guys currently running any A/B tests on your checkout flow?

We've been seeing a lot of brands lately with great ad performance, but they're losing 20-30% of their buyers right at the finish line due to minor friction. 

Would love to share a few tweaks we've been implementing if you're open to it. 

Jarred`
    },
    email2: {
      subject: 'Re: quick question',
      body: `{{GREETING}}

Just floating this back to the top of your inbox. 

Usually when we audit funnels, we find a few simple leaks that are costing a lot of money. Let me know if you're open to a quick chat about it!

Jarred`
    },
    email3: {
      subject: 'timing',
      body: `{{GREETING}}

Looks like timing might be off here, so I'll stop reaching out. 

If you guys ever want a second pair of eyes on your funnel to boost conversions, just let me know!

Jarred`
    }
  },
  sequenceB: {
    email1: {
      subject: 'scaling the backend',
      body: `{{GREETING}}

I was taking a look at your site and was curious—are you guys handling all your funnel optimization in-house right now?

A lot of brands we talk to are scaling their front-end ad spend, but their backend (landing pages, offers, follow-up emails) is dropping the ball. 

If you're open to it, I'd love to share how we plug those leaks. 

Jarred`
    },
    email2: {
      subject: 'Re: scaling the backend',
      body: `{{GREETING}}

Just checking back in on this. 

Most founders think they need more traffic to scale, when in reality, they just need to stop losing the traffic they already paid for. 

Are you guys currently focused on improving your conversion rates?

Jarred`
    },
    email3: {
      subject: 'closing the loop',
      body: `{{GREETING}}

Assuming this isn't a priority right now, so I'll close the loop. 

If you ever want to see exactly where revenue is slipping out of your funnel, feel free to reach out. 

Jarred`
    }
  },
  sequenceC: {
    email1: {
      subject: 'your conversion rate',
      body: `{{GREETING}}

Quick question for you—what's your main focus right now for growth? Are you leaning more towards increasing ad spend, or optimizing your current conversion rate?

We've found that lifting a funnel's conversion rate by just 0.5% brings in the same revenue as buying 25% more traffic (but without the ongoing ad costs).

Would love to show you how we do this if you're interested. 

Jarred`
    },
    email2: {
      subject: 'Re: your conversion rate',
      body: `{{GREETING}}

Bubbling this up! 

The biggest wins we find are usually in the places nobody is paying attention to—like the step between the opt-in and the offer, or the abandoned cart sequences. 

Let me know if you'd be open to a quick 10-minute chat to see if we can help you plug some leaks. 

Jarred`
    },
    email3: {
      subject: 'last one',
      body: `{{GREETING}}

I'll stop bugging you after this one. 

If ad costs keep climbing and you want to squeeze more margin out of the traffic you already have, let me know. 

Jarred`
    }
  }
};
