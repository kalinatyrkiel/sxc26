import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import sxcLogo from './assets/sxc/sxc-logo.png'
import arrowDown from './assets/doodles/arrow-down.svg'
import arrowDown2 from './assets/doodles/arrow-down-2.svg'
import speechBubbleDoodle from './assets/doodles/speech-bubble.svg'
import starDoodle from './assets/doodles/star.svg'
import squiggleDoodle from './assets/doodles/squiggle.svg'
import handDoodle from './assets/doodles/hand.svg'
import thesisChatbot from './assets/thesis-chatbot.png'
import thenLoom404 from './assets/then-loom-404.png'
import thenAnalyticsEmpty from './assets/then-analytics-empty.png'
import nowAskAboutCode from './assets/now-ask-about-code.png'
import nowBloombergTakeaways from './assets/now-bloomberg-takeaways.png'
import chatgptDisclaimer from './assets/example-visibility-disclaimer.png'
import chatgptStockholmKrakow from './assets/example-visibility-stockholm-krakow.png'
import zendeskWhySuggestion from './assets/zendesk-why-suggestion.png'
import blankBox from './assets/blank-box-anxiety.png'
import zendeskAiPrompts from './assets/zendesk-ai-prompts.png'
import notionSuggestions from './assets/notion-ai-full.png'
import cursorSteer from './assets/steer-without-interrupting.png'
import controlFeedback from './assets/example-control-feedback.png'
import controlModelPicker from './assets/example-control-model-picker.png'
import zendeskAutoAssist from './assets/zendesk-auto-assist.png'
import linkedinQr from './assets/linkedin-qr.jpg'
import balticSunrise from './assets/baltic-sunrise.jpg'
import './App.css'

const STAGE_WIDTH = 1920
const STAGE_HEIGHT = 1080

function Shot({
  src,
  alt,
  caption,
  className,
  annotation,
}: {
  src: string
  alt: string
  caption?: string
  className?: string
  annotation?: ReactNode
}) {
  return (
    <figure className={`shot${className ? ` ${className}` : ''}`}>
      <div className="shot-frame">
        <img src={src} alt={alt} />
        {annotation}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

function Note({
  children,
  arrow,
  className,
}: {
  children: ReactNode
  arrow?: string
  className?: string
}) {
  return (
    <p className={`note${className ? ` ${className}` : ''}`} aria-hidden="true">
      <span>{children}</span>
      {arrow && <img className="note-arrow" src={arrow} alt="" />}
    </p>
  )
}

function CartoonCallout({
  kicker,
  children,
  className,
}: {
  kicker?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`cartoon-callout${className ? ` ${className}` : ''}`}>
      {kicker && <p className="cartoon-callout-kicker">{kicker}</p>}
      <div className="cartoon-callout-body">{children}</div>
    </div>
  )
}

function Doodle({ src, className }: { src: string; className: string }) {
  return <img className={`doodle ${className}`} src={src} alt="" aria-hidden="true" />
}

function Cite({
  title,
  meta,
  finding,
}: {
  title: string
  meta: string
  finding?: string
}) {
  return (
    <cite className="cite">
      <span className="cite-title">{title}</span>
      <span className="cite-meta">{meta}</span>
      {finding && <span className="cite-finding">{finding}</span>}
    </cite>
  )
}

function FailIcon() {
  return (
    <svg viewBox="0 0 20 20" width="1em" height="1em" aria-hidden="true">
      <path
        d="M5 5 15 15M15 5 5 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="square"
      />
    </svg>
  )
}

function PassIcon() {
  return (
    <svg viewBox="0 0 20 20" width="1em" height="1em" aria-hidden="true">
      <path
        d="M4 10.5 8.5 15 16 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="square"
      />
    </svg>
  )
}

function AvoidInstead({
  title,
  avoid,
  instead,
  cite,
}: {
  title: ReactNode
  avoid: string
  instead: string
  cite: ReactNode
}) {
  return (
    <div className="pair-slide">
      <h2 className="title">{title}</h2>
      <div className="pair">
        <article className="pair-card is-avoid">
          <span className="pair-label">
            <FailIcon />
            Avoid
          </span>
          <div className="agent-output">
            <span className="agent-output-meta">Agent</span>
            <p>{avoid}</p>
          </div>
        </article>
        <article className="pair-card is-instead">
          <span className="pair-label">
            <PassIcon />
            Instead, try
          </span>
          <div className="agent-output">
            <span className="agent-output-meta">Agent</span>
            <p>{instead}</p>
          </div>
        </article>
      </div>
      {cite}
    </div>
  )
}

function Divider({
  num,
  section,
  children,
  lede,
}: {
  num: string
  section: string
  children: ReactNode
  lede?: ReactNode
}) {
  return (
    <div className="divider">
      <p className="divider-kicker">
        <span className="divider-num">{num}</span>
        {section}
      </p>
      <h2 className="statement">{children}</h2>
      {lede && <p className="lede">{lede}</p>}
    </div>
  )
}

function SystemPromptMock({ showSuggestion }: { showSuggestion: boolean }) {
  return (
    <div className="prompt-slide">
      <div className="prompt-copy">
        <h2 className="title">
          These patterns live in the <span className="hl-yellow">instructions</span>, too
        </h2>
        <p className="body">
          Content designers shape how AI agents respond: through system prompts
          and evals.
        </p>
      </div>
      <div className="prompt-panel">
        <div className="prompt-chrome">system.md</div>
        <pre className="prompt-code">
          <code>
            <span className="prompt-line">You are a support assistant.</span>
            {'\n'}
            <span className="prompt-line">Be clear and concise.</span>
            {'\n'}
            <span className={`prompt-line is-hot${showSuggestion ? ' is-on' : ''}`}>
              {showSuggestion
                ? 'Acknowledge the problem once. Never claim feelings. Lead with the next step.'
                : 'Be warm and empathetic.'}
            </span>
            {'\n'}
            <span className="prompt-line">Keep answers short.</span>
          </code>
        </pre>
        <aside
          className={`prompt-suggestion${showSuggestion ? ' is-in' : ''}`}
          aria-hidden={!showSuggestion}
        >
          <span className="label">Content design</span>
          <p>
            <strong>Empathy is a behavior, not a feeling.</strong> “Warm and
            empathetic” invites pseudo-empathy. Describe what the agent should
            do instead.
          </p>
        </aside>
      </div>
    </div>
  )
}

function BalticFlag({ code, x, y }: { code: 'se' | 'pl'; x: number; y: number }) {
  if (code === 'se') {
    return (
      <g className="baltic-schematic-flag" transform={`translate(${x}, ${y})`}>
        <rect width="32" height="20" fill="#006aa7" stroke="#f1f1f1" strokeWidth="1" />
        <rect x="11" width="4" height="20" fill="#fecc00" />
        <rect y="8" width="32" height="4" fill="#fecc00" />
      </g>
    )
  }
  return (
    <g className="baltic-schematic-flag" transform={`translate(${x}, ${y})`}>
      <rect width="32" height="10" fill="#f1f1f1" stroke="#f1f1f1" strokeWidth="1" />
      <rect y="10" width="32" height="10" fill="#dc143c" />
    </g>
  )
}

function BalticPlaceLabel({
  code,
  x,
  y,
  label,
}: {
  code: 'se' | 'pl'
  x: number
  y: number
  label: string
}) {
  const tone = code === 'se' ? 'stockholm' : 'gdynia'
  return (
    <g className={`baltic-schematic-place is-${tone}`}>
      <BalticFlag code={code} x={x} y={y - 18} />
      <text className={`baltic-schematic-city is-${tone}`} x={x + 42} y={y}>
        {label}
      </text>
    </g>
  )
}

function BalticSchematicMap() {
  /* Simple basin: straits SW, Poland S/E, Sweden N/W. */
  const balticCoast =
    'M 200 408 L 280 428 L 380 432 L 620 408 L 728 288 L 680 128 L 460 92 L 320 112 L 248 228 L 200 408 Z'

  const stockholm = { x: 318, y: 118 }
  /* ~same longitude as Stockholm, mostly south (not far east). */
  const gdynia = { x: 358, y: 408 }
  const gotland = { x: 395, y: 268 }

  return (
    <svg
      className="baltic-schematic-svg"
      viewBox="0 0 800 520"
      role="img"
      aria-label="Schematic map of the Baltic Sea with Stockholm and Gdynia marked."
    >
      <rect className="baltic-schematic-bg" width="800" height="520" />
      <path className="baltic-schematic-sea" d={balticCoast} />
      <path
        className="baltic-schematic-land"
        fillRule="evenodd"
        d={`M 0 0 H 800 V 520 H 0 Z ${balticCoast}`}
      />
      <ellipse
        className="baltic-schematic-land is-island"
        cx={gotland.x}
        cy={gotland.y}
        rx="36"
        ry="20"
      />
      <text className="baltic-schematic-island-label" x={gotland.x} y={gotland.y + 5}>
        Gotland
      </text>
      <text className="baltic-schematic-sea-label" x="535" y="258">
        Baltic Sea
      </text>
      <path
        className="baltic-schematic-route"
        d={`M ${stockholm.x} ${stockholm.y} L ${gdynia.x} ${gdynia.y}`}
      />
      <g className="baltic-schematic-marker is-stockholm">
        <circle className="baltic-schematic-marker-ring" cx={stockholm.x} cy={stockholm.y} r="16" />
        <circle className="baltic-schematic-marker-dot" cx={stockholm.x} cy={stockholm.y} r="6" />
      </g>
      <BalticPlaceLabel code="se" x={352} y={102} label="Stockholm, Sweden" />
      <g className="baltic-schematic-marker is-gdynia">
        <circle className="baltic-schematic-marker-ring" cx={gdynia.x} cy={gdynia.y} r="18" />
        <circle className="baltic-schematic-marker-dot" cx={gdynia.x} cy={gdynia.y} r="7" />
      </g>
      <BalticPlaceLabel code="pl" x={392} y={392} label="Gdynia, Poland" />
    </svg>
  )
}

function BalticMapSlide() {
  return (
    <div className="baltic-map-slide">
      <figure className="baltic-map-figure">
        <div className="shot-frame baltic-schematic-frame">
          <BalticSchematicMap />
        </div>
      </figure>
    </div>
  )
}

function StoryChatSlide({ build }: { build: number }) {
  return (
    <div className="story-chat">
      <div className="story-chat-panel">
        <div className="story-chat-row is-user">
          <span className="story-chat-meta">Me</span>
          <blockquote className="story-chat-quote">
            “Will the clouds on the horizon clear in time for sunrise?”
          </blockquote>
        </div>
        {build >= 1 && (
          <div className="story-chat-row is-ai">
            <span className="story-chat-meta">AI</span>
            <div className="story-chat-reply">
              <p>
                Low clouds often linger near the coast at dawn. Check a local
                forecast for the next hour—visibility can change quickly.
              </p>
              {build >= 2 && (
                <p className="story-chat-hot">
                  “I envy you getting to see that.”
                </p>
              )}
            </div>
          </div>
        )}
        {build >= 3 && (
          <Note className="story-chat-note">
            LOL you don&apos;t envy anything, you&apos;re an LLM
          </Note>
        )}
      </div>
    </div>
  )
}

type Slide = {
  className?: string
  builds?: number
  credit?: string
  content: ReactNode | ((build: number) => ReactNode)
}

const slides: Slide[] = [
  {
    className: 'hero-slide',
    content: (
      <div className="hero">
        <div className="hero-copy">
          <img className="hero-logo" src={sxcLogo} alt="SXC, STHLM Xperience Conference 2026" />
          <h1 className="hero-title">
            Designing around AI:{' '}
            <span className="hero-title-sub">the psychology of new design patterns</span>
          </h1>
          <div className="hero-speaker">
            <p className="hero-name">Kalina Tyrkiel-Szymańska</p>
            <p className="hero-role">Senior Content Designer @ Zendesk</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    className: 'intro-slide',
    content: (
      <div className="intro">
        <div className="intro-copy">
          <h2 className="title">Hi, I’m Kalina</h2>
          <p className="role">
            UX writer by trade, psychologist by training
          </p>
          <ul className="intro-list">
            <li>
              Senior Content Designer working on
              <br />
              AI experiences at <strong>Zendesk</strong>
            </li>
            <li>Trainer, lecturer, and creator of Poland’s first AI in UX writing course</li>
          </ul>
        </div>
        <div className="intro-thesis">
          <Shot
            src={thesisChatbot}
            alt="Thesis record: Factors influencing satisfaction of interactions with chatbots, by Kalina Tyrkiel, Master’s in applied psychology, 2020."
            caption="My psychology MA thesis, 2020"
          />
          <Note className="intro-note" arrow={arrowDown}>
            chatbots, before they were cool
          </Note>
        </div>
      </div>
    ),
  },
  {
    className: 'audience-slide',
    content: (
      <div className="audience-ask">
        <p className="audience-ask-prompt">
          Anyone worked with a{' '}
          <span className="audience-ask-role">
            <span className="hl-yellow">UX writer</span>
            <span className="audience-ask-role-sub">(content designer)</span>
          </span>{' '}
          before?
        </p>
      </div>
    ),
  },
  {
    className: 'era-slide',
    credit: 'Examples: Loom, Spotify for Creators',
    content: (
      <div className="era">
        <div className="era-copy">
          <span className="tag tag-mint">Then</span>
          <h2 className="title">Fixed strings in fixed places</h2>
          <p className="body">
            Traditional design patterns assume a <strong>predictable system</strong>.
            Error states, empty states, labels: written once, reused forever.
          </p>
        </div>
        <div className="era-shots">
          <Shot
            src={thenLoom404}
            alt="Loom 404 page: Oops, we couldn't find this Loom. It may have been deleted or archived by its creator."
          />
          <Shot
            src={thenAnalyticsEmpty}
            alt="Empty analytics state: Not enough plays yet. Once you get a few plays, we'll show your analytics here."
          />
        </div>
      </div>
    ),
  },
  {
    className: 'era-slide',
    credit: 'Examples: Cursor, Bloomberg',
    content: (
      <div className="era">
        <div className="era-copy">
          <span className="tag tag-pink">Now</span>
          <h2 className="title">Prompted, conversational, probabilistic</h2>
          <p className="body">
            Generative AI is built on predictions, but it’s{' '}
            <strong>anything but predictable</strong>. Copy is generated in the
            moment.
          </p>
        </div>
        <div className="era-shots era-shots-tall">
          <Shot
            src={nowAskAboutCode}
            alt="AI coding assistant empty state: Ask about your code. AI responses may be inaccurate."
          />
          <Shot
            src={nowBloombergTakeaways}
            alt="Bloomberg AI takeaways card, labeled Summary by Bloomberg AI."
          />
        </div>
      </div>
    ),
  },
  {
    className: 'statement-slide',
    content: (
      <div className="statement-wrap">
        <h2 className="statement">
          You can’t take the <span className="hl-yellow">language</span>
          <br />
          out of the <span className="hl-pink">large language model</span>
        </h2>
      </div>
    ),
  },
  {
    className: 'statement-slide',
    content: (
      <div className="statement-wrap">
        <h2 className="statement statement-md">
          Every new LLM pattern is, at its core, a{' '}
          <span className="hl-yellow">language decision</span>.
        </h2>
        <Doodle src={speechBubbleDoodle} className="statement-speech" />
      </div>
    ),
  },
  {
    className: 'agenda-slide',
    content: (
      <div className="agenda">
        <ol className="agenda-grid">
          <li>
            <span className="agenda-num">1</span>
            <h3>Disclosure</h3>
          </li>
          <li>
            <span className="agenda-num">2</span>
            <h3>Mental models</h3>
          </li>
          <li>
            <span className="agenda-num">3</span>
            <h3>Anthropomorphism</h3>
          </li>
          <li>
            <span className="agenda-num">4</span>
            <h3>Biases</h3>
          </li>
        </ol>
      </div>
    ),
  },

  /* 01 Disclose */
  {
    className: 'divider-slide',
    content: (
      <Divider num="1" section="Disclose AI outputs">
        Anything AI generates could be a <span className="hl-pink">hallucination</span>
      </Divider>
    ),
  },
  {
    className: 'disclose-slide',
    credit: 'Examples: ChatGPT, Bloomberg',
    content: (
      <div className="disclose">
        <div className="disclose-copy">
          <ul className="rules rules--plain">
            <li>
              <strong>Admit it can be wrong:</strong> “ChatGPT can make mistakes.”
            </li>
            <li>
              <strong>Label the source:</strong> “Summary by Bloomberg AI”
            </li>
          </ul>
        </div>
        <div className="disclose-shots">
          <Shot
            src={chatgptDisclaimer}
            alt="ChatGPT can make mistakes. Workspace data isn't used to train models."
            className="shot-disclaimer"
          />
          <Shot
            src={nowBloombergTakeaways}
            alt="Bloomberg takeaways card labeled Summary by Bloomberg AI."
            className="shot-bloomberg"
          />
        </div>
      </div>
    ),
  },
  {
    className: 'statement-slide habituation-slide',
    content: (
      <div className="statement-wrap habituation-wrap">
        <Doodle src={starDoodle} className="habituation-star" />
        <Doodle src={squiggleDoodle} className="habituation-squiggle" />
        <div className="habituation-panel">
          <CartoonCallout kicker={<span className="cartoon-callout-scribble">Habituation</span>}>
            <p>We get used to seeing the same disclaimers.</p>
          </CartoonCallout>
          <Cite
            title="Empowering Calibrated (Dis-)Trust in Conversational Agents"
            meta="Metzger et al. · CHI 2024"
            finding="Information on limitations didn't affect trust."
          />
        </div>
      </div>
    ),
  },
  {
    className: 'work-slide',
    credit: 'Examples: Zendesk, ChatGPT',
    content: (
      <div className="work">
        <div className="work-copy">
          <h2 className="title">Show the work</h2>
          <p className="body">
            Sources, reasoning, and system status help people{' '}
            <strong>calibrate trust</strong> instead of trusting blindly.
          </p>
        </div>
        <div className="work-shots">
          <Shot
            src={zendeskWhySuggestion}
            alt="Zendesk panel: Why this suggestion was generated, with a plain-language reason and a link to the source article."
            caption="Why this suggestion? · Zendesk"
          />
          <Shot
            src={chatgptStockholmKrakow}
            alt="ChatGPT: Worked for 7s, web search for population stats, answer citing Stockholm Business Region and Kraków city data with a source link preview."
            caption="Search, timing, and cited sources · ChatGPT"
          />
        </div>
      </div>
    ),
  },

  /* 02 Expectations */
  {
    className: 'divider-slide',
    credit: 'Example: Notion',
    content: (
      <div className="divider-with-shot">
        <Divider num="2" section="Manage expectations">
          An empty box promises <span className="hl-yellow">everything</span> – and nothing at all
        </Divider>
        <Shot src={blankBox} alt="An empty Notion AI input with the placeholder Ask Notion AI." className="shot-blank" />
      </div>
    ),
  },
  {
    className: 'divider-slide',
    credit: 'Example: Notion',
    content: (
      <div className="divider-with-shot">
        <Divider num="2" section="Manage expectations">
          No mental model of what the system can do{' '}
          <span className="hl-yellow">+ blank page anxiety</span>
        </Divider>
        <Shot src={blankBox} alt="An empty Notion AI input with the placeholder Ask Notion AI." className="shot-blank" />
      </div>
    ),
  },
  {
    className: 'capabilities-slide',
    credit: 'Examples: Zendesk, Notion',
    content: (
      <div className="capabilities">
        <div className="capabilities-copy">
          <h2 className="title">Say what the AI can do</h2>
          <p className="body">
            Short, specific, timely. Suggested actions teach people what the
            system is for, before they type a word.
          </p>
          <Note className="capabilities-note">expand · simplify · rewrite. that’s the whole manual.</Note>
        </div>
        <div className="capabilities-shots">
          <Shot
            src={zendeskAiPrompts}
            alt="Zendesk AI writing menu: Expand, Simplify, Rewrite in your tone, Make more friendly, Make more formal, plus a custom prompt field."
            caption="AI in the message composer · Zendesk"
          />
          <Shot
            src={notionSuggestions}
            alt="Notion AI: How can I help you today? with suggestions Summarize this page, Translate this page, Analyze for insights, Create a task tracker."
            caption="Suggested actions · Notion"
          />
        </div>
      </div>
    ),
  },
  {
    className: 'control-slide',
    credit: 'Examples: Cursor, ChatGPT',
    content: (
      <div className="control">
        <h2 className="title">Keep people in control</h2>
        <div className="control-grid">
          <article className="control-wide">
            <h3>
              <span className="hl-mint">Steer</span> while it works
            </h3>
            <Shot src={cursorSteer} alt="Cursor agent input with the placeholder Steer without interrupting and a stop button." />
          </article>
          <article>
            <h3>
              <span className="hl-mint">Rate</span> the answer
            </h3>
            <Shot src={controlFeedback} alt="Response rating menu: Good response, Bad response." />
          </article>
          <article>
            <h3>
              <span className="hl-mint">Choose</span> the model
            </h3>
            <Shot src={controlModelPicker} alt="Model picker listing models with a description of Claude Sonnet 5.5." />
          </article>
        </div>
      </div>
    ),
  },
  {
    className: 'approve-slide',
    credit: 'Example: Zendesk',
    content: (
      <div className="approve">
        <div className="approve-copy">
          <h2 className="title">
            Draft, <span className="hl-pink">don’t send</span>
          </h2>
          <p className="body">
            AI drafts the reply. A human support agent reads, edits, and{' '}
            <strong>approves</strong> before anything reaches the customer.
          </p>
        </div>
        <div className="approve-shot">
          <figure className="shot">
            <div className="shot-frame">
              <div className="approve-shot-media">
                <img
                  src={zendeskAutoAssist}
                  alt="Zendesk Auto assist drafting a reply to a customer, with an Approve button."
                />
                <Note className="approve-note" arrow={arrowDown}>
                  the most important button
                </Note>
              </div>
            </div>
            <figcaption>Auto assist · Zendesk</figcaption>
          </figure>
        </div>
      </div>
    ),
  },

  /* 03 Anthropomorphism */
  {
    className: 'divider-slide',
    content: (
      <Divider num="3" section="Don't make AI too human">
        Tone and wording shape trust
      </Divider>
    ),
  },
  {
    content: (
      <AvoidInstead
        title="Emotional language"
        avoid="I’m so sorry you’re dealing with this. I completely understand how frustrating that must feel."
        instead="I couldn’t find that order. Check the confirmation email, or search by order number."
        cite={
          <Cite
            title="Mirages. On Anthropomorphism in Dialogue Systems"
            meta="Abercrombie, Cercas Curry, Dinkar, Rieser, Talat · EMNLP 2023"
            finding="Pseudo-empathy and emotion language push personification and over-reliance, especially in high-risk contexts."
          />
        }
      />
    ),
  },
  {
    className: 'statement-slide',
    content: (
      <div className="statement-wrap">
        <h2 className="statement statement-md">
          <span className="hl-yellow">CASA</span> –{' '}
          <span className="hl-yellow">C</span>omputers <span className="hl-yellow">A</span>re{' '}
          <span className="hl-yellow">S</span>ocial <span className="hl-yellow">A</span>ctors
        </h2>
        <p className="lede">
          People use <span className="hl-yellow">social rules</span> with computers — not only with
          people.
        </p>
        <Cite title="The Media Equation" meta="Nass & Reeves · 1996" />
      </div>
    ),
  },
  {
    className: 'statement-slide',
    content: (
      <div className="statement-wrap">
        <h2 className="statement statement-md">
          We treat computers like people (
          <span className="hl-yellow">often without noticing</span>) — and we think it{' '}
          <span className="hl-pink">doesn&apos;t apply to us</span>.
        </h2>
      </div>
    ),
  },
  {
    content: (
      <AvoidInstead
        title={
          <>
            <span className="hl-yellow">Teammate</span> framing
          </>
        }
        avoid="I’m your AI writing teammate. I’ll take it from here and draft the empty state for us."
        instead="Here’s a draft of the empty state. Review it before it ships."
        cite={
          <Cite
            title="Believing Anthropomorphism: Cues on Trust in LLMs"
            meta="Cohn, Chang, et al. · CHI 2024 · n = 2,165"
            finding="In some contexts, first-person “I” made the same answers feel more accurate and less risky to rely on."
          />
        }
      />
    ),
  },
  {
    className: 'statement-slide',
    content: (
      <div className="statement-wrap">
        <h2 className="statement statement-md">
          Saying <span className="hl-yellow">&quot;AI can be wrong&quot;</span> didn&apos;t change trust.{' '}
          How <span className="hl-yellow">certain</span> the AI sounded did.
        </h2>
        <Cite
          title="Empowering Calibrated (Dis-)Trust in Conversational Agents"
          meta="Metzger et al. · CHI 2024"
        />
      </div>
    ),
  },
  {
    className: 'dial-slide',
    content: (
      <div className="dial">
        <h2 className="title">How human should AI sound?</h2>
        <div className="dial-track">
          <article className="dial-stop">
            <span className="dial-label">Too robotic</span>
            <p className="dial-output">Error 404: order_id not found.</p>
            <p className="dial-why">Cold, unhelpful, no next step</p>
          </article>
          <article className="dial-stop is-target">
            <span className="dial-label">Helpful tool</span>
            <p className="dial-output">I couldn’t find that order. Try searching by order number.</p>
            <p className="dial-why">Plain, honest, actionable</p>
            <Note className="dial-note" arrow={arrowDown2}>
              aim here
            </Note>
          </article>
          <article className="dial-stop">
            <span className="dial-label">Too human</span>
            <p className="dial-output">Oh no, I feel terrible! Let’s fix this together, friend 💛</p>
            <p className="dial-why">Fake feelings, inflated trust</p>
          </article>
        </div>
      </div>
    ),
  },
  {
    className: 'story-place-slide',
    content: (
      <div className="story-place">
        <figure className="story-place-figure">
          <div className="shot-frame story-place-frame">
            <img
              src={balticSunrise}
              alt="Sunrise over the Baltic Sea with an silhouetted sculpture on the shore."
            />
          </div>
        </figure>
        <p className="story-place-prompt">
          Anyone know <span className="hl-yellow">where this is</span>?
        </p>
      </div>
    ),
  },
  {
    className: 'story-map-slide',
    content: <BalticMapSlide />,
  },
  {
    className: 'story-chat-slide',
    builds: 3,
    content: (build) => <StoryChatSlide build={build} />,
  },
  {
    className: 'statement-slide',
    content: (
      <div className="statement-wrap">
        <h2 className="statement statement-md">
          A functional <span className="hl-mint">“I”</span> for actions is fine.
        </h2>
        <p className="lede">
          Feelings, friendship, and teammate framing are not.
        </p>
      </div>
    ),
  },
  {
    className: 'prompt-slide-wrap',
    builds: 1,
    content: (build) => <SystemPromptMock showSuggestion={build > 0} />,
  },

  /* 04 Bias */
  {
    className: 'divider-slide',
    content: (
      <Divider num="4" section="Design around bias">
        When AI sounds sure, <span className="hl-yellow">we stop checking</span>
      </Divider>
    ),
  },
  {
    content: (
      <AvoidInstead
        title="Confident tone"
        avoid="Use a modal. It’s the clearest way to get confirmation."
        instead="A modal can work for irreversible actions. If the task is frequent, also consider an inline confirmation."
        cite={
          <Cite
            title="Humans and Automation: Use, Misuse, Disuse, Abuse"
            meta="Parasuraman & Riley · Human Factors, 1997 · automation bias"
            finding="When systems sound authoritative, people over-rely and skip their own verification, even when the output is wrong."
          />
        }
      />
    ),
  },
  {
    className: 'statement-slide',
    content: (
      <div className="statement-wrap">
        <h2 className="statement statement-md">
          AI is quietly <span className="hl-pink">breaking default trust</span> at work
        </h2>
      </div>
    ),
  },
  {
    className: 'statement-slide',
    content: (
      <div className="statement-wrap">
        <h2 className="statement statement-md">
          We generate documents with AI.
          <br />
          Documents that only AI reads.
        </h2>
      </div>
    ),
  },
  {
    className: 'statement-slide',
    content: (
      <div className="statement-wrap">
        <h2 className="statement statement-md">
          Normalize saying:
          <br />
          <span className="hl-yellow">“I explored this with AI.”</span>
        </h2>
      </div>
    ),
  },
  {
    className: 'takeaways-slide',
    content: (
      <div className="takeaways">
        <h2 className="title">Leave with this</h2>
        <div className="takeaways-grid">
          <article>
            <span className="agenda-num">1</span>
            <h3>Disclose</h3>
            <p>Label AI output. Show sources. Say what to verify.</p>
          </article>
          <article>
            <span className="agenda-num">2</span>
            <h3>Set expectations</h3>
            <p>Say what the AI can do. Keep people in control. Draft, don’t send.</p>
          </article>
          <article>
            <span className="agenda-num">3</span>
            <h3>Tool, not teammate</h3>
            <p>Skip pseudo-empathy and teammate framing. Write it into the prompt.</p>
          </article>
          <article>
            <span className="agenda-num">4</span>
            <h3>Design for doubt</h3>
            <p>Hedge confident answers. Keep humans accountable. Test with people.</p>
          </article>
        </div>
      </div>
    ),
  },
  {
    className: 'closing-slide',
    content: (
      <div className="closing">
        <div className="closing-copy">
          <h2 className="closing-title">
            Thank you!
            <span className="closing-sub">Design for doubt, and enjoy the ride.</span>
          </h2>
          <div className="closing-workshop">
            <span className="label">Today 15:20 · Digital workshop</span>
            <p>Creating UX copy with AI (the right way)</p>
          </div>
        </div>
        <figure className="closing-qr">
          <img src={linkedinQr} alt="QR code linking to Kalina Tyrkiel-Szymańska’s LinkedIn profile" />
          <figcaption>Let’s connect on LinkedIn</figcaption>
        </figure>
        <Doodle src={starDoodle} className="closing-star" />
        <Doodle src={squiggleDoodle} className="closing-squiggle" />
        <Doodle src={handDoodle} className="closing-hand" />
      </div>
    ),
  },
]

function useStageScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return scale
}

function App() {
  const initialSlide = useMemo(() => {
    const hash = Number(window.location.hash.replace('#', ''))
    return hash >= 1 && hash <= slides.length ? hash - 1 : 0
  }, [])
  const [current, setCurrent] = useState(initialSlide)
  const [build, setBuild] = useState(0)
  const scale = useStageScale()
  const slide = slides[current]
  const maxBuild = slide.builds ?? 0
  const content = typeof slide.content === 'function' ? slide.content(build) : slide.content

  const goTo = useCallback((index: number) => {
    const next = Math.min(Math.max(index, 0), slides.length - 1)
    setCurrent(next)
    setBuild(0)
    window.history.replaceState(null, '', `#${next + 1}`)
  }, [])

  const advance = useCallback(() => {
    if (build < maxBuild) {
      setBuild((value) => value + 1)
      return
    }
    goTo(current + 1)
  }, [build, maxBuild, current, goTo])

  const retreat = useCallback(() => {
    if (build > 0) {
      setBuild((value) => value - 1)
      return
    }
    const previous = Math.max(current - 1, 0)
    setBuild(slides[previous].builds ?? 0)
    setCurrent(previous)
    window.history.replaceState(null, '', `#${previous + 1}`)
  }, [build, current])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (target.tagName === 'BUTTON') return
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(event.key)) {
        event.preventDefault()
        advance()
      }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        retreat()
      }
      if (event.key === 'Home') goTo(0)
      if (event.key === 'End') goTo(slides.length - 1)
      if (event.key.toLowerCase() === 'f') {
        if (document.fullscreenElement) document.exitFullscreen()
        else document.documentElement.requestFullscreen()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [advance, retreat, goTo])

  return (
    <main className="deck">
      <div
        className="stage"
        style={{
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <section
          className={`slide ${slide.className ?? ''}`}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest('button, a')) return
            advance()
          }}
        >
          <header className="slide-header">
            <span className="slide-header-brand">SXC 2026</span>
          </header>
          <div className="slide-content">{content}</div>
          <footer className="slide-footer">
            <div className="slide-footer-leading">
              <span>Kalina Tyrkiel-Szymańska</span>
              {slide.credit && <span className="slide-footer-credit">{slide.credit}</span>}
            </div>
            <div className="slide-nav">
              <button
                type="button"
                onClick={() => retreat()}
                disabled={current === 0 && build === 0}
                aria-label="Previous slide"
              >
                ←
              </button>
              <span className="slide-count">
                {current + 1} / {slides.length}
              </span>
              <button
                type="button"
                onClick={() => advance()}
                disabled={current === slides.length - 1 && build >= maxBuild}
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </footer>
          <div className="progress" aria-hidden="true">
            <div className="progress-fill" style={{ width: `${((current + 1) / slides.length) * 100}%` }} />
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
