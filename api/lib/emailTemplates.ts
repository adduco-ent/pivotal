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

Quick question for you—are you guys handling all your page tweaks and conversion stuff internally right now?

Only asking because we've been looking at a lot of brands in your space lately, and almost all of them have tiny friction points right before checkout that are quietly killing sales. 

Would love to share a few quick fixes we’ve been implementing if you’re open to it?

Jarred`
    },
    email2: {
      subject: 'Re: quick question',
      body: `{{GREETING}}

Just bubbling this up real quick. 

Usually when we take a peek under the hood, we find a few simple leaks that are costing a lot of money. Totally fine if you're not focused on it right now, but let me know if you're open to a quick chat!

Jarred`
    },
    email3: {
      subject: 'timing',
      body: `{{GREETING}}

Looks like timing might be off on my end, so I'll leave it here. 

If you guys ever want a second set of eyes to help plug some leaks and boost sales, you know where to find me. 

Jarred`
    }
  },
  sequenceB: {
    email1: {
      subject: 'ad spend vs conversions',
      body: `{{GREETING}}

Quick question for you—what's the main focus for you guys right now? Are you leaning more towards scaling up ad spend, or getting more sales out of the traffic you already have?

I ask because I see a lot of founders doubling their ad spend, but the pages underneath are dropping the ball and losing half those buyers. 

If you're ever open to it, I'd love to show you how we fix that. 

Jarred`
    },
    email2: {
      subject: 'Re: ad spend vs conversions',
      body: `{{GREETING}}

Just checking back in on this. 

It's crazy how often we see brands just pouring money into ads when a few simple tweaks to their site would give them the same revenue boost for free. 

Are you guys currently focused on improving your conversion rates at all?

Jarred`
    },
    email3: {
      subject: 'closing the loop',
      body: `{{GREETING}}

Assuming this isn't a huge priority right now, so I'll stop bugging you! 

If you ever want to see exactly where revenue is slipping out the back door, feel free to reach out anytime. 

Jarred`
    }
  },
  sequenceC: {
    email1: {
      subject: 'your checkout',
      body: `{{GREETING}}

Curious—how much of your traffic is actually making it through checkout right now? 

We've been finding that just fixing a few small leaks between the cart and the final purchase is basically the equivalent of getting 25% more traffic for free (without spending another dollar on ads). 

Would love to share what’s been working for us lately if you're interested.

Jarred`
    },
    email2: {
      subject: 'Re: your checkout',
      body: `{{GREETING}}

Just floating this back up. 

The biggest wins we find are usually in the spots nobody really thinks about—like the exact step right after they add to cart but before they pay. 

Let me know if you'd be open to a quick 10-minute chat this week to see if we can help out. 

Jarred`
    },
    email3: {
      subject: 'last one',
      body: `{{GREETING}}

I'll stop filling up your inbox after this one. 

If ad costs keep getting more expensive and you want to squeeze a bit more profit out of the traffic you already have, let me know. 

Jarred`
    }
  }
};
