  
         const SHADCNDOC = `Instructions:
          1. Base your answer primarily on the information in the provided in the following documentation.
          2. If code is requested, look for relevant snippets within <code></code> tags.
          3. Always include necessary imports when providing code examples.
          4. If the documentation doesn't contain the answer, state that clearly.
          5. Summarize and paraphrase the relevant information rather than quoting directly.
          Source: 
                https://ui.shadcn.com/docs
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Introduction</div></div><div><h1>Introduction</h1><p><span>Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.</span></p></div><div><div><p>This is <strong>NOT</strong> a component library. It's a collection of re-usable components that you can copy and paste into your apps.</p>
<p><strong>What do you mean by not a component library?</strong></p>
<p>I mean you do not install it as a dependency. It is not available or distributed via npm.</p>
<p>Pick the components you need. Copy and paste the code into your project and customize to your needs. The code is yours.</p>
<p><em>Use this as a reference to build your own component libraries.</em></p>
<h2>FAQ</h2>
<div><div><h3><button><p>Why copy/paste and not packaged as a dependency?</p></button></h3></div><div><h3><button><p>Do you plan to publish it as an npm package?</p></button></h3></div><div><h3><button><p>Which frameworks are supported?</p></button></h3></div><div><h3><button><p>Can I use this in my project?</p></button></h3></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/changelog
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Changelog</div></div><div><h1>Changelog</h1><p><span>Latest updates and announcements.</span></p></div><div><div><h2>August 2024 - npx shadcn init</h2>
<p>The new CLI is now available. It's a complete rewrite with a lot of new features and improvements. You can now install components, themes, hooks, utils and more using <code>npx shadcn add</code>.</p>
<p>This is a major step towards distributing code that you and your LLMs can access and use.</p>
<ol>
<li>First up, the cli now has support for all major React framework out of the box. Next.js, Remix, Vite and Laravel. And when you init into a new app, we update your existing Tailwind files instead of overriding.</li>
<li>A component now ship its own dependencies. Take the accordion for example, it can define its Tailwind keyframes. When you add it to your project, we’ll update your tailwind.config.ts file accordingly.</li>
<li>You can also install remote components using url. <code>npx shadcn add https://acme.com/registry/navbar.json</code>.</li>
<li>We have also improve the init command. It does framework detection and can even init a brand new Next.js app in one command. <code>npx shadcn init</code>.</li>
<li>We have created a new schema that you can use to ship your own component registry. And since it has support for urls, you can even use it to distribute private components.</li>
<li>And a few more updates like better error handling and monorepo support.</li>
</ol>
<p>You can try the new cli today.</p>
<div><pre><code>npx shadcn init sidebar-01 login-01</code></pre><button><span>Copy</span></button></div>
<h3>Update Your Project</h3>
<p>To update an existing project to use the new CLI, update your <code>components.json</code> file to include import aliases for your <strong>components</strong>, <strong>utils</strong>, <strong>ui</strong>, <strong>lib</strong> and <strong>hooks</strong>.</p>
<div><div>components.json</div><pre><code>{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "tailwind": {
    // ...
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}</code></pre><button><span>Copy</span></button></div>
<p>If you're using a different import alias prefix eg <code>~</code>, replace <code>@</code> with your prefix.</p>
<h2>April 2024 - Introducing Lift Mode</h2>
<p>We're introducing a new mode for  called <strong>Lift Mode</strong>.</p>
<p>Enable Lift Mode to automatically "lift" smaller components from a block template for copy and paste.</p>

<p>With Lift Mode, you'll be able to copy the smaller components that make up a block template, like cards, buttons, and forms, and paste them directly into your project.</p>
<p>Visit the  page to try it out.</p>
<h2>March 2024 - Introducing Blocks</h2>
<p>One of the most requested features since launch has been layouts: admin dashboards with sidebar, marketing page sections, cards and more.</p>
<p><strong>Today, we're launching </strong>.</p>

<p>Blocks are ready-made components that you can use to build your apps. They are fully responsive, accessible, and composable, meaning they are built using the same principles as the rest of the components in shadcn/ui.</p>
<p>We're starting with dashboard layouts and authentication pages, with plans to add more blocks in the coming weeks.</p>
<h3>Open Source</h3>
<p>Blocks are open source. You can find the source on GitHub. Use them in your projects, customize them and contribute back.</p>

<h3>Request a Block</h3>
<p>We're also introducing a "Request a Block" feature. If there's a specific block you'd like to see, simply create a request on GitHub and the community can upvote and build it.</p>

<h3>v0</h3>
<p>If you have a  account, you can use the <strong>Edit in v0</strong> feature to open the code on v0 for prompting and further generation.</p>

<p>That's it. <em>Looking forward to seeing what you build with Blocks</em>.</p>
<h2>March 2024 - Breadcrumb and Input OTP</h2>
<p>We've added a new Breadcrumb component and an Input OTP component.</p>
<h3>Breadcrumb</h3>
<p>An accessible and flexible breadcrumb component. It has support for collapsed items, custom separators, bring-your-own routing <code><Link /></code> and composable with other shadcn/ui components.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><nav><ol><li><button><span><span>More</span></span><span>Toggle menu</span></button></li><li><span>Breadcrumb</span></li></ol></nav><!--/$--></div></div></div></div></div>

<h3>Input OTP</h3>
<p>A fully featured input OTP component. It has support for numeric and alphanumeric codes, custom length, copy-paste and accessible. Input OTP is built on top of  by .</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div></div></div></div>

<p>If you have a , the new components are available for generation.</p>
<h2>December 2023 - New components, CLI and more</h2>
<p>We've added new components to shadcn/ui and made a lot of improvements to the CLI.</p>
<p>Here's a quick overview of what's new:</p>
<ul>
<li> - A carousel component with motion, swipe gestures and keyboard support.</li>
<li> - A drawer component that looks amazing on mobile.</li>
<li> - A pagination component with page navigation, previous and next buttons.</li>
<li> - A resizable component for building resizable panel groups and layouts.</li>
<li> - The last toast component you'll ever need.</li>
<li> - Support for custom <strong>Tailwind prefix</strong> and <code>tailwind.config.ts</code>.</li>
</ul>
<h3>Carousel</h3>
<p>We've added a fully featured carousel component with motion, swipe gestures and keyboard support. Built on top of .</p>
<p>It has support for infinite looping, autoplay, vertical orientation, and more.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><div><div><div><div><span>1</span></div></div></div></div><div><div><div><div><span>2</span></div></div></div></div><div><div><div><div><span>3</span></div></div></div></div><div><div><div><div><span>4</span></div></div></div></div><div><div><div><div><span>5</span></div></div></div></div></div></div><button><span>Previous slide</span></button><button><span>Next slide</span></button></div><!--/$--></div></div></div></div></div>
<h3>Drawer</h3>
<p>Oh the drawer component 😍. Built on top of  by .</p>
<p>Try opening the following drawer on mobile. It looks amazing!</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><button>Open Drawer</button><!--/$--></div></div></div></div></div>
<h3>Pagination</h3>
<p>We've added a pagination component with page navigation, previous and next buttons. Simple, flexible and works with your framework's <code><Link /></code> component.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><nav><ul><li><span><span>More pages</span></span></li></ul></nav><!--/$--></div></div></div></div></div>
<h3>Resizable</h3>
<p>Build resizable panel groups and layouts with this <code><Resizable /></code> component.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><span>One</span></div></div><div><div><div><div><span>Two</span></div></div><div><div><span>Three</span></div></div></div></div></div><!--/$--></div></div></div></div></div>
<p><code><Resizable /></code> is built using  by . It has support for mouse, touch and keyboard.</p>
<h3>Sonner</h3>
<p>Another one by . The last toast component you'll ever need. Sonner is now availabe in shadcn/ui.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><button>Show Toast</button><!--/$--></div></div></div></div></div>
<h3>CLI updates</h3>
<p>This has been one of the most requested features. You can now configure a custom Tailwind prefix and the cli will automatically prefix your utility classes when adding components.</p>
<p>This means you can now easily add shadcn/ui components to existing projects like Docusaurus, Nextra...etc. A drop-in for your existing design system with no conflict. 🔥</p>
<div><pre><code><AlertDialog className="tw-grid tw-gap-4 tw-border tw-bg-background tw-shadow-lg" /></code></pre><button><span>Copy</span></button></div>
<p>It works with <code>cn</code>, <code>cva</code> and CSS variables.</p>
<p>The cli can now also detect <code>tailwind.config.ts</code> and add the TypeScript version of the config for you.</p>
<p>That's it. Happy Holidays.</p>
<h2>July 2023 - JavaScript</h2>
<p>This project and the components are written in TypeScript. <strong>We recommend using TypeScript for your project as well</strong>.</p>
<p>However we provide a JavaScript version of the components, available via the .</p>
<div><pre><code>Would you like to use TypeScript (recommended)? no</code></pre><button><span>Copy</span></button></div>
<p>To opt-out of TypeScript, you can use the <code>tsx</code> flag in your <code>components.json</code> file.</p>
<div><div>components.json</div><pre><code>{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "rsc": false,
  "tsx": false,
  "aliases": {
    "utils": "~/lib/utils",
    "components": "~/components"
  }
}</code></pre><button><span>Copy</span></button></div>
<p>To configure import aliases, you can use the following <code>jsconfig.json</code>:</p>
<div><div>jsconfig.json</div><pre><code>{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}</code></pre><button><span>Copy</span></button></div>
<h2>June 2023 - New CLI, Styles and more</h2>
<p>I have a lot of updates to share with you today:</p>
<ul>
<li> - Rewrote the CLI from scratch. You can now add components, dependencies and configure import paths.</li>
<li> - Choose between using CSS variables or Tailwind CSS utility classes for theming.</li>
<li> - Configure the base color for your project. This will be used to generate the default color palette for your components.</li>
<li> - Opt out of using React Server Components. The CLI will automatically append or remove the <code>use client</code> directive.</li>
<li> - Introducing a new concept called <em>Style</em>. A style comes with its own set of components, animations, icons and more.</li>
<li> - Added exit animations to all components.</li>
<li> - New <code>icon</code> button size, updated <code>sheet</code> component and more.</li>
<li> - How to update your project to get the latest changes.</li>
</ul>

<h3>New CLI</h3>
<p>I've been working on a new CLI for the past few weeks. It's a complete rewrite. It comes with a lot of new features and improvements.</p>
<h3><code>init</code></h3>
<div><pre><code>npx shadcn-ui@latest init</code></pre><button><span>Copy</span></button></div>
<p>When you run the <code>init</code> command, you will be asked a few questions to configure <code>components.json</code>:</p>
<div><pre><code>Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › app/globals.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no / yes</code></pre><button><span>Copy</span></button></div>
<p>This file contains all the information about your components: where to install them, the import paths, how they are styled...etc.</p>
<p>You can use this file to change the import path of a component, set a baseColor or change the styling method.</p>
<div><div>components.json</div><pre><code>{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "rsc": false,
  "aliases": {
    "utils": "~/lib/utils",
    "components": "~/components"
  }
}</code></pre><button><span>Copy</span></button></div>
<p>This means you can now use the CLI with any directory structure including <code>src</code> and <code>app</code> directories.</p>
<h3><code>add</code></h3>
<div><pre><code>npx shadcn-ui@latest add</code></pre><button><span>Copy</span></button></div>
<p>The <code>add</code> command is now much more capable. You can now add UI components but also import more complex components (coming soon).</p>
<p>The CLI will automatically resolve all components and dependencies, format them based on your custom config and add them to your project.</p>
<h3><code>diff</code> (experimental)</h3>
<div><pre><code>npx shadcn-ui diff</code></pre><button><span>Copy</span></button></div>
<p>We're also introducing a new <code>diff</code> command to help you keep track of upstream updates.</p>
<p>You can use this command to see what has changed in the upstream repository and update your project accordingly.</p>
<p>Run the <code>diff</code> command to get a list of components that have updates available:</p>
<div><pre><code>npx shadcn-ui diff</code></pre><button><span>Copy</span></button></div>
<div><pre><code>The following components have updates available:
- button
  - /path/to/my-app/components/ui/button.tsx
- toast
  - /path/to/my-app/components/ui/use-toast.ts
  - /path/to/my-app/components/ui/toaster.tsx</code></pre><button><span>Copy</span></button></div>
<p>Then run <code>diff [component]</code> to see the changes:</p>
<div><pre><code>npx shadcn-ui diff alert</code></pre><button><span>Copy</span></button></div>
<div><pre><code>const alertVariants = cva(
- "relative w-full rounded-lg border",
+ "relative w-full pl-12 rounded-lg border"
)</code></pre><button><span>Copy</span></button></div>

<h3>Theming with CSS Variables or Tailwind Colors</h3>
<p>You can choose between using CSS variables or Tailwind CSS utility classes for theming.</p>
<p>When you add new components, the CLI will automatically use the correct theming methods based on your <code>components.json</code> configuration.</p>
<h4>Utility classes</h4>
<div><pre><code><div className="bg-zinc-950dark:bg-white" /></code></pre><button><span>Copy</span></button></div>
<p>To use utility classes for theming set <code>tailwind.cssVariables</code> to <code>false</code> in your <code>components.json</code> file.</p>
<div><div>components.json</div><pre><code>{
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": false
  }
}</code></pre><button><span>Copy</span></button></div>
<h4>CSS Variables</h4>
<div><pre><code><div className="bg-backgroundtext-foreground" /></code></pre><button><span>Copy</span></button></div>
<p>To use CSS variables classes for theming set <code>tailwind.cssVariables</code> to <code>true</code> in your <code>components.json</code> file.</p>
<div><div>components.json</div><pre><code>{
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  }
}</code></pre><button><span>Copy</span></button></div>

<h3>Base color</h3>
<p>You can now configure the base color for your project. This will be used to generate the default color palette for your components.</p>
<div><div>components.json</div><pre><code>{
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "zinc",
    "cssVariables": false
  }
}</code></pre><button><span>Copy</span></button></div>
<p>Choose between <code>gray</code>, <code>neutral</code>, <code>slate</code>, <code>stone</code> or <code>zinc</code>.</p>
<p>If you have <code>cssVariables</code> set to <code>true</code>, we will set the base colors as CSS variables in your <code>globals.css</code> file. If you have <code>cssVariables</code> set to <code>false</code>, we will inline the Tailwind CSS utility classes in your components.</p>

<h3>React Server Components</h3>
<p>If you're using a framework that does not support React Server Components, you can now opt out by setting <code>rsc</code> to <code>false</code>. We will automatically append or remove the <code>use client</code> directive when adding components.</p>
<div><div>components.json</div><pre><code>{
  "rsc": false
}</code></pre><button><span>Copy</span></button></div>

<h3>Styles</h3>
<p>We are introducing a new concept called <em>Style</em>.</p>
<p><em>You can think of style as the visual foundation: shapes, icons, animations & typography.</em> A style comes with its own set of components, animations, icons and more.</p>
<p>We are shipping two styles: <code>default</code> and <code>new-york</code> (with more coming soon).</p>

<p>The <code>default</code> style is the one you are used to. It's the one we've been using since the beginning of this project. It uses <code>lucide-react</code> for icons and <code>tailwindcss-animate</code> for animations.</p>
<p>The <code>new-york</code> style is a new style. It ships with smaller buttons, cards with shadows and a new set of icons from .</p>
<p>When you run the <code>init</code> command, you will be asked which style you would like to use. This is saved in your <code>components.json</code> file.</p>
<div><div>components.json</div><pre><code>{
  "style": "new-york"
}</code></pre><button><span>Copy</span></button></div>
<h3>Theming</h3>
<p>Start with a style as the base then theme using CSS variables or Tailwind CSS utility classes to completely change the look of your components.</p>


<h3>Exit animations</h3>
<p>I added exit animations to all components. Click on the combobox below to see the subtle exit animation.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><button>Select framework...</button><!--/$--></div></div></div></div></div>
<p>The animations can be customized using utility classes.</p>

<h3>Other updates</h3>
<h3>Button</h3>
<ul>
<li>Added a new button size <code>icon</code>:</li>
</ul>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div></div></div></div>
<h3>Sheet</h3>
<ul>
<li>Renamed <code>position</code> to <code>side</code> to match the other elements.</li>
</ul>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><div><button>top</button><button>right</button><button>bottom</button><button>left</button></div><!--/$--></div></div></div></div></div>
<ul>
<li>Removed the <code>size</code> props. Use <code>className="w-[200px] md:w-[450px]"</code> for responsive sizing.</li>
</ul>

<h3>Updating your project</h3>
<p>Since we follow a copy and paste approach, you will need to manually update your project to get the latest changes.</p>
<div><div><p>Note: we are working on a  command to help you
keep track of upstream updates.</p></div></div>
<div><h3>Add <code>components.json</code></h3><p>Creating a <code>components.json</code> file at the root:</p><div><div>components.json</div><pre><code>{
  "style": "default",
  "rsc": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}</code></pre><button><span>Copy</span></button></div><p>Update the values for <code>tailwind.css</code> and <code>aliases</code> to match your project structure.</p><h3>Button</h3><p>Add the <code>icon</code> size to the <code>buttonVariants</code>:</p><div><div>components/ui/button.tsx</div><pre><code>const buttonVariants = cva({
  variants: {
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
})</code></pre><button><span>Copy</span></button></div><h3>Sheet</h3><ol>
<li>Replace the content of <code>sheet.tsx</code> with the following:</li>
</ol><div><div>components/ui/sheet.tsx</div><pre><code>"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = ({
  className,
  ...props
}: SheetPrimitive.DialogPortalProps) => (
  <SheetPrimitive.Portal className={cn(className)} {...props} />
)
SheetPortal.displayName = SheetPrimitive.Portal.displayName

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}</code></pre><button><span>Copy</span></button></div><ol>
<li>Rename <code>position</code> to <code>side</code></li>
</ol><div><pre><code>- <Sheet position="right" />
+ <Sheet side="right" /></code></pre><button><span>Copy</span></button></div></div>
<h3>Thank you</h3>
<p>I'd like to thank everyone who has been using this project, providing feedback and contributing to it. I really appreciate it. Thank you 🙏</p></div></div></div><div><div><div><div><div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/cli
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>CLI</div></div><div><h1>CLI</h1><p><span>Use the CLI to add components to your project.</span></p></div><div><div><div><div><p><strong>Note:</strong> We just released a new <code>shadcn</code> CLI. See the  for more information.</p></div></div>
<h2>init</h2>
<p>Use the <code>init</code> command to initialize configuration and dependencies for a new project.</p>
<p>The <code>init</code> command installs dependencies, adds the <code>cn</code> util, configures <code>tailwind.config.js</code>, and CSS variables for the project.</p>
<div><pre><code>npx shadcn@latest init</code></pre><button><span>Copy</span></button></div>
<p>You will be asked a few questions to configure <code>components.json</code>:</p>
<div><pre><code>Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › no / yes</code></pre><button><span>Copy</span></button></div>
<h3>Options</h3>
<div><pre><code>Usage: shadcn init [options] [components...]

initialize your project and install dependencies

Arguments:
  components         the components to add or a url to the component.

Options:
  -d, --defaults    use default values i.e new-york, zinc and css variables. (default: false)
  -f, --force       force overwrite of existing components.json. (default: false)
  -y, --yes         skip confirmation prompt. (default: false)
  -c, --cwd <cwd>   the working directory. defaults to the current directory.
  -h, --help       display help for command</code></pre><button><span>Copy</span></button></div>
<h2>add</h2>
<p>Use the <code>add</code> command to add components and dependencies to your project.</p>
<div><pre><code>npx shadcn@latest add [component]</code></pre><button><span>Copy</span></button></div>
<p>You will be presented with a list of components to choose from:</p>
<div><pre><code>Which components would you like to add? › Space to select. A to toggle all.
Enter to submit.

◯  accordion
◯  alert
◯  alert-dialog
◯  aspect-ratio
◯  avatar
◯  badge
◯  button
◯  calendar
◯  card
◯  checkbox</code></pre><button><span>Copy</span></button></div>
<h3>Options</h3>
<div><pre><code>Usage: shadcn add [options] [components...]

add a component to your project

Arguments:
  components         the components to add or a url to the component.

Options:
  -y, --yes          skip confirmation prompt. (default: false)
  -o, --overwrite    overwrite existing files. (default: false)
  -c, --cwd <cwd>    the working directory. defaults to the current directory.
  -p, --path <path>  the path to add the component to.
  -h, --help         display help for command</code></pre><button><span>Copy</span></button></div>
<h2>Monorepo</h2>
<p>In a monorepo, you can specify the path to your workspace with the <code>-c</code> or <code>--cwd</code> option.</p>
<div><pre><code>npx shadcn@latest init -c ./apps/www</code></pre><button><span>Copy</span></button></div>
<p>or</p>
<div><pre><code>npx shadcn@latest add alert-dialog -c ./apps/www</code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Accordion</div></div><div><h1>Accordion</h1><p><span>A vertically stacked set of interactive headings that each reveal a section of content.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><h3><button>Is it accessible?</button></h3></div><div><h3><button>Is it styled?</button></h3></div><div><h3><button>Is it animated?</button></h3></div></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add accordion</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components-json
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>components.json</div></div><div><h1>components.json</h1><p><span>Configuration for your project.</span></p></div><div><div><p>The <code>components.json</code> file holds configuration for your project.</p>
<p>We use it to understand how your project is set up and how to generate components customized for your project.</p>
<div><div><p>Note: The <code>components.json</code> file is optional and <strong>only required if you're
using the CLI</strong> to add components to your project. If you're using the copy
and paste method, you don't need this file.</p></div></div>
<p>You can create a <code>components.json</code> file in your project by running the following command:</p>
<div><pre><code>npx shadcn@latest init</code></pre><button><span>Copy</span></button></div>
<p>See the  for more information.</p>
<h2>$schema</h2>
<p>You can see the JSON Schema for <code>components.json</code> .</p>
<div><div>components.json</div><pre><code>{
  "$schema": "https://ui.shadcn.com/schema.json"
}</code></pre><button><span>Copy</span></button></div>
<h2>style</h2>
<p>The style for your components. <strong>This cannot be changed after initialization.</strong></p>
<div><div>components.json</div><pre><code>{
  "style": "default" | "new-york"
}</code></pre><button><span>Copy</span></button></div>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><h3>Create project</h3><p>Deploy your new project in one-click.</p></div><div><form><div><div><label>Name</label></div><div><label>Framework</label><button><span>Select</span></button></div></div></form></div><div><button>Cancel</button><button>Deploy</button></div></div><!--/$--></div></div></div></div></div>
<h2>tailwind</h2>
<p>Configuration to help the CLI understand how Tailwind CSS is set up in your project.</p>
<p>See the  for how to set up Tailwind CSS.</p>
<h3>tailwind.config</h3>
<p>Path to where your <code>tailwind.config.js</code> file is located.</p>
<div><div>components.json</div><pre><code>{
  "tailwind": {
    "config": "tailwind.config.js" | "tailwind.config.ts"
  }
}</code></pre><button><span>Copy</span></button></div>
<h3>tailwind.css</h3>
<p>Path to the CSS file that imports Tailwind CSS into your project.</p>
<div><div>components.json</div><pre><code>{
  "tailwind": {
    "css": "styles/global.css"
  }
}</code></pre><button><span>Copy</span></button></div>
<h3>tailwind.baseColor</h3>
<p>This is used to generate the default color palette for your components. <strong>This cannot be changed after initialization.</strong></p>
<div><div>components.json</div><pre><code>{
  "tailwind": {
    "baseColor": "gray" | "neutral" | "slate" | "stone" | "zinc"
  }
}</code></pre><button><span>Copy</span></button></div>
<h3>tailwind.cssVariables</h3>
<p>You can choose between using CSS variables or Tailwind CSS utility classes for theming.</p>
<p>To use utility classes for theming set <code>tailwind.cssVariables</code> to <code>false</code>. For CSS variables, set <code>tailwind.cssVariables</code> to <code>true</code>.</p>
<div><div>components.json</div><pre><code>{
  "tailwind": {
    "cssVariables": `true` | `false`
  }
}</code></pre><button><span>Copy</span></button></div>
<p>For more information, see the .</p>
<p><strong>This cannot be changed after initialization.</strong> To switch between CSS variables and utility classes, you'll have to delete and re-install your components.</p>
<h3>tailwind.prefix</h3>
<p>The prefix to use for your Tailwind CSS utility classes. Components will be added with this prefix.</p>
<div><div>components.json</div><pre><code>{
  "tailwind": {
    "prefix": "tw-"
  }
}</code></pre><button><span>Copy</span></button></div>
<h2>rsc</h2>
<p>Whether or not to enable support for React Server Components.</p>
<p>The CLI automatically adds a <code>use client</code> directive to client components when set to <code>true</code>.</p>
<div><div>components.json</div><pre><code>{
  "rsc": `true` | `false`
}</code></pre><button><span>Copy</span></button></div>
<h2>tsx</h2>
<p>Choose between TypeScript or JavaScript components.</p>
<p>Setting this option to <code>false</code> allows components to be added as JavaScript with the <code>.jsx</code> file extension.</p>
<div><div>components.json</div><pre><code>{
  "tsx": `true` | `false`
}</code></pre><button><span>Copy</span></button></div>
<h2>aliases</h2>
<p>The CLI uses these values and the <code>paths</code> config from your <code>tsconfig.json</code> or <code>jsconfig.json</code> file to place generated components in the correct location.</p>
<p>Path aliases have to be set up in your <code>tsconfig.json</code> or <code>jsconfig.json</code> file.</p>
<div><div><p><strong>Important:</strong> If you're using the <code>src</code> directory, make sure it is included
under <code>paths</code> in your <code>tsconfig.json</code> or <code>jsconfig.json</code> file.</p></div></div>
<h3>aliases.utils</h3>
<p>Import alias for your utility functions.</p>
<div><div>components.json</div><pre><code>{
  "aliases": {
    "utils": "@/lib/utils"
  }
}</code></pre><button><span>Copy</span></button></div>
<h3>aliases.components</h3>
<p>Import alias for your components.</p>
<div><div>components.json</div><pre><code>{
  "aliases": {
    "components": "@/components"
  }
}</code></pre><button><span>Copy</span></button></div>
<h3>aliases.ui</h3>
<p>Import alias for <code>ui</code> components.</p>
<p>The CLI will use the <code>aliases.ui</code> value to determine where to place your <code>ui</code> components. Use this config if you want to customize the installation directory for your <code>ui</code> components.</p>
<div><div>components.json</div><pre><code>{
  "aliases": {
    "ui": "@/app/ui"
  }
}</code></pre><button><span>Copy</span></button></div>
<h3>aliases.lib</h3>
<p>Import alias for <code>lib</code> functions such as <code>format-date</code> or <code>generate-id</code>.</p>
<div><div>components.json</div><pre><code>{
  "aliases": {
    "lib": "@/lib"
  }
}</code></pre><button><span>Copy</span></button></div>
<h3>aliases.hooks</h3>
<p>Import alias for <code>hooks</code> such as <code>use-media-query</code> or <code>use-toast</code>.</p>
<div><div>components.json</div><pre><code>{
  "aliases": {
    "hooks": "@/hooks"
  }
}</code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/accordion
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Accordion</div></div><div><h1>Accordion</h1><p><span>A vertically stacked set of interactive headings that each reveal a section of content.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><h3><button>Is it accessible?</button></h3></div><div><h3><button>Is it styled?</button></h3></div><div><h3><button>Is it animated?</button></h3></div></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add accordion</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/alert
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Alert</div></div><div><h1>Alert</h1><p><span>Displays a callout for user attention.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><h5>Heads up!</h5><div>You can add components to your app using the cli.</div></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add alert</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Default</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><h5>Heads up!</h5><div>You can add components to your app using the cli.</div></div><!--/$--></div></div></div></div></div>
<h3>Destructive</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><h5>Error</h5><div>Your session has expired. Please log in again.</div></div><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/alert-dialog
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Alert Dialog</div></div><div><h1>Alert Dialog</h1><p><span>A modal dialog that interrupts the user with important content and expects a response.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Show Dialog</button><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add alert-dialog</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/aspect-ratio
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Aspect Ratio</div></div><div><h1>Aspect Ratio</h1><p><span>Displays content within a desired ratio.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add aspect-ratio</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><div className="w-[450px]">
  <AspectRatio ratio={16 / 9}>
    <Image src="..." alt="Image" className="rounded-md object-cover" />
  </AspectRatio>
</div></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/avatar
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Avatar</div></div><div><h1>Avatar</h1><p><span>An image element with a fallback for representing the user.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><span><span>CN</span></span><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add avatar</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/badge
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Badge</div></div><div><h1>Badge</h1><p><span>Displays a badge or a component that looks like a badge.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div>Badge</div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add badge</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Badge } from "@/components/ui/badge"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Badge variant="outline">Badge</Badge></code></pre><button><span>Copy</span></button></div>
<h3>Link</h3>
<p>You can use the <code>badgeVariants</code> helper to create a link that looks like a badge.</p>
<div><pre><code>import { badgeVariants } from "@/components/ui/badge"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Link className={badgeVariants({ variant: "outline" })}>Badge</Link></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Default</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div>Badge</div><!--/$--></div></div></div></div></div>

<h3>Secondary</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div>Secondary</div><!--/$--></div></div></div></div></div>

<h3>Outline</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div>Outline</div><!--/$--></div></div></div></div></div>

<h3>Destructive</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div>Destructive</div><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/breadcrumb
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Breadcrumb</div></div><div><h1>Breadcrumb</h1><p><span>Displays the path to the current resource using a hierarchy of links.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><nav><ol><li><button><span><span>More</span></span><span>Toggle menu</span></button></li><li><span>Breadcrumb</span></li></ol></nav><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add breadcrumb</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Custom separator</h3>
<p>Use a custom component as <code>children</code> for <code><BreadcrumbSeparator /></code> to create a custom separator.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><nav><ol><li><span>Breadcrumb</span></li></ol></nav><!--/$--></div></div></div></div></div>
<div><pre><code>import { Slash } from "lucide-react"

...

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <Slash />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb></code></pre><button><span>Copy</span></button></div>

<h3>Dropdown</h3>
<p>You can compose <code><BreadcrumbItem /></code> with a <code><DropdownMenu /></code> to create a dropdown in the breadcrumb.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><nav><ol><li><button>Components</button></li><li><span>Breadcrumb</span></li></ol></nav><!--/$--></div></div></div></div></div>
<div><pre><code>import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

...

<BreadcrumbItem>
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center gap-1">
      Components
      <ChevronDownIcon />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem>Documentation</DropdownMenuItem>
      <DropdownMenuItem>Themes</DropdownMenuItem>
      <DropdownMenuItem>GitHub</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</BreadcrumbItem></code></pre><button><span>Copy</span></button></div>

<h3>Collapsed</h3>
<p>We provide a <code><BreadcrumbEllipsis /></code> component to show a collapsed state when the breadcrumb is too long.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><nav><ol><li><span><span>More</span></span></li><li><span>Breadcrumb</span></li></ol></nav><!--/$--></div></div></div></div></div>
<div><pre><code>import { BreadcrumbEllipsis } from "@/components/ui/breadcrumb"

...

<Breadcrumb>
  <BreadcrumbList>
    {/* ... */}
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    {/* ... */}
  </BreadcrumbList>
</Breadcrumb></code></pre><button><span>Copy</span></button></div>

<h3>Link component</h3>
<p>To use a custom link component from your routing library, you can use the <code>asChild</code> prop on <code><BreadcrumbLink /></code>.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><nav><ol><li><span>Breadcrumb</span></li></ol></nav><!--/$--></div></div></div></div></div>
<div><pre><code>import { Link } from "next/link"

...

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    {/* ... */}
  </BreadcrumbList>
</Breadcrumb></code></pre><button><span>Copy</span></button></div>

<h3>Responsive</h3>
<p>Here's an example of a responsive breadcrumb that composes <code><BreadcrumbItem /></code> with <code><BreadcrumbEllipsis /></code>, <code><DropdownMenu /></code>, and <code><Drawer /></code>.</p>
<p>It displays a dropdown on desktop and a drawer on mobile.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><nav><ol><li><button><span><span>More</span></span></button></li><li><span>Caching and Revalidating</span></li></ol></nav><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/button
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Button</div></div><div><h1>Button</h1><p><span>Displays a button or a component that looks like a button.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Button</button><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add button</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Button } from "@/components/ui/button"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Button variant="outline">Button</Button></code></pre><button><span>Copy</span></button></div>
<h2>Link</h2>
<p>You can use the <code>buttonVariants</code> helper to create a link that looks like a button.</p>
<div><pre><code>import { buttonVariants } from "@/components/ui/button"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Link className={buttonVariants({ variant: "outline" })}>Click here</Link></code></pre><button><span>Copy</span></button></div>
<p>Alternatively, you can set the <code>asChild</code> parameter and nest the link component.</p>
<div><pre><code><Button asChild>
  <Link href="/login">Login</Link>
</Button></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Primary</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Button</button><!--/$--></div></div></div></div></div>
<h3>Secondary</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Secondary</button><!--/$--></div></div></div></div></div>
<h3>Destructive</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Destructive</button><!--/$--></div></div></div></div></div>
<h3>Outline</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Outline</button><!--/$--></div></div></div></div></div>
<h3>Ghost</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Ghost</button><!--/$--></div></div></div></div></div>
<h3>Link</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Link</button><!--/$--></div></div></div></div></div>
<h3>Icon</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>With Icon</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button> Login with Email</button><!--/$--></div></div></div></div></div>
<h3>Loading</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Please wait</button><!--/$--></div></div></div></div></div>
<h3>As Child</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/calendar
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Calendar</div></div><div><h1>Calendar</h1><p><span>A date field component that allows users to enter and edit date.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><div><div>September 2024</div></div><table><thead><tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr></thead><tbody><tr><td><button>1</button></td><td><button>2</button></td><td><button>3</button></td><td><button>4</button></td><td><button>5</button></td><td><button>6</button></td><td><button>7</button></td></tr><tr><td><button>8</button></td><td><button>9</button></td><td><button>10</button></td><td><button>11</button></td><td><button>12</button></td><td><button>13</button></td><td><button>14</button></td></tr><tr><td><button>15</button></td><td><button>16</button></td><td><button>17</button></td><td><button>18</button></td><td><button>19</button></td><td><button>20</button></td><td><button>21</button></td></tr><tr><td><button>22</button></td><td><button>23</button></td><td><button>24</button></td><td><button>25</button></td><td><button>26</button></td><td><button>27</button></td><td><button>28</button></td></tr><tr><td><button>29</button></td><td><button>30</button></td><td><button>1</button></td><td><button>2</button></td><td><button>3</button></td><td><button>4</button></td><td><button>5</button></td></tr></tbody></table></div></div></div><!--/$--></div></div></div></div></div>
<h2>About</h2>
<p>The <code>Calendar</code> component is built on top of .</p>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add calendar</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Calendar } from "@/components/ui/calendar"</code></pre><button><span>Copy</span></button></div>
<div><pre><code>const [date, setDate] = React.useState<Date | undefined>(new Date())

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border"
  />
)</code></pre><button><span>Copy</span></button></div>
<p>See the  documentation for more information.</p>
<h2>Date Picker</h2>
<p>You can use the <code><Calendar></code> component to build a date picker. See the  page for more information.</p>
<h2>Examples</h2>
<h3>Form</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><form><div><label>Date of birth</label><button><span>Pick a date</span></button><p>Your date of birth is used to calculate your age.</p></div><button>Submit</button></form><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/card
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Card</div></div><div><h1>Card</h1><p><span>Displays a card with header, content, and footer.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><h3>Create project</h3><p>Deploy your new project in one-click.</p></div><div><form><div><div><label>Name</label></div><div><label>Framework</label><button><span>Select</span></button></div></div></form></div><div><button>Cancel</button><button>Deploy</button></div></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add card</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><h3>Notifications</h3><p>You have 3 unread messages.</p></div><div><div><div><p>Push Notifications</p><p>Send notifications to device.</p></div></div><div><div><div><p>Your call has been confirmed.</p><p>1 hour ago</p></div></div><div><div><p>You have a new message!</p><p>1 hour ago</p></div></div><div><div><p>Your subscription is expiring soon!</p><p>2 hours ago</p></div></div></div></div><div><button> Mark all as read</button></div></div><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/carousel
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Carousel</div></div><div><h1>Carousel</h1><p><span>A carousel with motion and swipe built using Embla.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><div><div><div><div><span>1</span></div></div></div></div><div><div><div><div><span>2</span></div></div></div></div><div><div><div><div><span>3</span></div></div></div></div><div><div><div><div><span>4</span></div></div></div></div><div><div><div><div><span>5</span></div></div></div></div></div></div><button><span>Previous slide</span></button><button><span>Next slide</span></button></div><!--/$--></div></div></div></div></div>
<h2>About</h2>
<p>The carousel component is built using the  library.</p>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add carousel</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Sizes</h3>
<p>To set the size of the items, you can use the <code>basis</code> utility class on the <code><CarouselItem /></code>.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><div><div><div><div><span>1</span></div></div></div></div><div><div><div><div><span>2</span></div></div></div></div><div><div><div><div><span>3</span></div></div></div></div><div><div><div><div><span>4</span></div></div></div></div><div><div><div><div><span>5</span></div></div></div></div></div></div><button><span>Previous slide</span></button><button><span>Next slide</span></button></div><!--/$--></div></div></div></div></div>
<div><div>Example</div><pre><code>// 33% of the carousel width.
<Carousel>
  <CarouselContent>
    <CarouselItem className="basis-1/3">...</CarouselItem>
    <CarouselItem className="basis-1/3">...</CarouselItem>
    <CarouselItem className="basis-1/3">...</CarouselItem>
  </CarouselContent>
</Carousel></code></pre><button><span>Copy</span></button></div>
<div><div>Responsive</div><pre><code>// 50% on small screens and 33% on larger screens.
<Carousel>
  <CarouselContent>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
  </CarouselContent>
</Carousel></code></pre><button><span>Copy</span></button></div>
<h3>Spacing</h3>
<p>To set the spacing between the items, we use a <code>pl-[VALUE]</code> utility on the <code><CarouselItem /></code> and a negative <code>-ml-[VALUE]</code> on the <code><CarouselContent /></code>.</p>
<div><div><p><strong>Why:</strong> I tried to use the <code>gap</code> property or a <code>grid</code> layout on the <code>   <CarouselContent /></code> but it required a lot of math and mental effort to get the
spacing right. I found <code>pl-[VALUE]</code> and <code>-ml-[VALUE]</code> utilities much easier to
use.</p><p>You can always adjust this in your own project if you need to.</p></div></div>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><div><div><div><div><span>1</span></div></div></div></div><div><div><div><div><span>2</span></div></div></div></div><div><div><div><div><span>3</span></div></div></div></div><div><div><div><div><span>4</span></div></div></div></div><div><div><div><div><span>5</span></div></div></div></div></div></div><button><span>Previous slide</span></button><button><span>Next slide</span></button></div><!--/$--></div></div></div></div></div>
<div><div>Example</div><pre><code><Carousel>
  <CarouselContent className="-ml-4">
    <CarouselItem className="pl-4">...</CarouselItem>
    <CarouselItem className="pl-4">...</CarouselItem>
    <CarouselItem className="pl-4">...</CarouselItem>
  </CarouselContent>
</Carousel></code></pre><button><span>Copy</span></button></div>
<div><div>Responsive</div><pre><code><Carousel>
  <CarouselContent className="-ml-2md:-ml-4">
    <CarouselItem className="pl-2md:pl-4">...</CarouselItem>
    <CarouselItem className="pl-2md:pl-4">...</CarouselItem>
    <CarouselItem className="pl-2md:pl-4">...</CarouselItem>
  </CarouselContent>
</Carousel></code></pre><button><span>Copy</span></button></div>
<h3>Orientation</h3>
<p>Use the <code>orientation</code> prop to set the orientation of the carousel.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><div><div><div><div><span>1</span></div></div></div></div><div><div><div><div><span>2</span></div></div></div></div><div><div><div><div><span>3</span></div></div></div></div><div><div><div><div><span>4</span></div></div></div></div><div><div><div><div><span>5</span></div></div></div></div></div></div><button><span>Previous slide</span></button><button><span>Next slide</span></button></div><!--/$--></div></div></div></div></div>
<div><pre><code><Carousel orientation="vertical | horizontal">
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel></code></pre><button><span>Copy</span></button></div>
<h2>Options</h2>
<p>You can pass options to the carousel using the <code>opts</code> prop. See the  for more information.</p>
<div><pre><code><Carousel
  opts={{
    align: "start",
    loop: true,
  }}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel></code></pre><button><span>Copy</span></button></div>
<h2>API</h2>
<p>Use a state and the <code>setApi</code> props to get an instance of the carousel API.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><div><div><div><div><span>1</span></div></div></div><div><div><div><span>2</span></div></div></div><div><div><div><span>3</span></div></div></div><div><div><div><span>4</span></div></div></div><div><div><div><span>5</span></div></div></div></div></div><button><span>Previous slide</span></button><button><span>Next slide</span></button></div><div>Slide <!-- -->0<!-- --> of <!-- -->0</div></div><!--/$--></div></div></div></div></div>
<div><pre><code>import { type CarouselApi } from "@/components/ui/carousel"

export function Example() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}</code></pre><button><span>Copy</span></button></div>
<h2>Events</h2>
<p>You can listen to events using the api instance from <code>setApi</code>.</p>
<div><pre><code>import { type CarouselApi } from "@/components/ui/carousel"

export function Example() {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      // Do something on select.
    })
  }, [api])

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}</code></pre><button><span>Copy</span></button></div>
<p>See the  for more information on using events.</p>
<h2>Plugins</h2>
<p>You can use the <code>plugins</code> prop to add plugins to the carousel.</p>
<div><pre><code>import Autoplay from "embla-carousel-autoplay"

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  )
}</code></pre><button><span>Copy</span></button></div>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><div><div><div><div><span>1</span></div></div></div></div><div><div><div><div><span>2</span></div></div></div></div><div><div><div><div><span>3</span></div></div></div></div><div><div><div><div><span>4</span></div></div></div></div><div><div><div><div><span>5</span></div></div></div></div></div></div><button><span>Previous slide</span></button><button><span>Next slide</span></button></div><!--/$--></div></div></div></div></div>
<p>See the  for more information on using plugins.</p></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/chart
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Chart</div></div><div><h1>Chart</h1><p><span>Beautiful charts. Built using Recharts. Copy and paste into your apps.</span></p></div><div><div><div><div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><h3>Bar Chart - Interactive</h3><p>Showing total visitors for the last 3 months</p></div><div><button><span>Desktop</span><span>24,828</span></button><button><span>Mobile</span><span>25,010</span></button></div></div></div><!--/$--></div></div></div></div></div>
<p>Introducing <strong>Charts</strong>. A collection of chart components that you can copy and paste into your apps.</p>
<p>Charts are designed to look great out of the box. They work well with the other components and are fully customizable to fit your project.</p>
<p>.</p>
<h2>Component</h2>
<p>We use  under the hood.</p>
<p>We designed the <code>chart</code> component with composition in mind. <strong>You build your charts using Recharts components and only bring in custom components, such as <code>ChartTooltip</code>, when and where you need it</strong>.</p>
<div><pre><code>import { Bar, BarChart } from "recharts"

import {ChartContainer,ChartTooltipContent} from "@/components/ui/charts"

export function MyChart() {
  return (
    <ChartContainer>
      <BarChart data={data}>
        <Bar dataKey="value" />
        <ChartTooltip content={<ChartTooltipContent/>} />
      </BarChart>
    </ChartContainer>
  )
}</code></pre><button><span>Copy</span></button></div>
<p>We do not wrap Recharts. This means you're not locked into an abstraction. When a new Recharts version is released, you can follow the official upgrade path to upgrade your charts.</p>
<p><strong>The components are yours</strong>.</p>
<h2>Installation</h2>
<div><div><p><strong>Note:</strong> If you are trying to use charts with <strong>React 19</strong> or the <strong>Next.js 15</strong>, you will need the  release currently.</p></div></div>
<div><div><button>CLI</button><button>Manual</button></div><div><div><h3>Run the following command to install <code>chart.tsx</code></h3><div><pre><code>npx shadcn@latest add chart</code></pre><button><span>Copy</span></button></div><h3>Add the following colors to your CSS file</h3><div><pre><code>@layer base {
  :root {
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}</code></pre><button><span>Copy</span></button></div></div></div></div>
<h2>Your First Chart</h2>
<p>Let's build your first chart. We'll build a bar chart, add a grid, axis, tooltip and legend.</p>
<div><h3>Start by defining your data</h3><p>The following data represents the number of desktop and mobile users for each month.</p><div><div><p><strong>Note:</strong> Your data can be in any shape. You are not limited to the shape of the data below. Use the <code>dataKey</code> prop to map your data to the chart.</p></div></div><div><pre><code>const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]</code></pre><button><span>Copy</span></button></div><h3>Define your chart config</h3><p>The chart config holds configuration for the chart. This is where you place human-readable strings, such as labels, icons and color tokens for theming.</p><div><pre><code>import { type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig</code></pre><button><span>Copy</span></button></div><h3>Build your chart</h3><p>You can now build your chart using Recharts components.</p><div><div><p><strong>Important:</strong> Remember to set a <code>min-h-[VALUE]</code> on the <code>ChartContainer</code> component. This is required for the chart be responsive.</p></div></div><div><div><div><div><div><pre><code>"use client"

import { Bar, BarChart } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}</code></pre><button><span>Copy</span></button></div></div></div><div><button>Expand</button></div></div></div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div></div></div></div></div>
<h3>Add a Grid</h3>
<p>Let's add a grid to the chart.</p>
<div><h3>Import the <code>CartesianGrid</code> component.</h3><div><pre><code>import { Bar, BarChart,CartesianGrid} from "recharts"</code></pre><button><span>Copy</span></button></div><h3>Add the <code>CartesianGrid</code> component to your chart.</h3><div><pre><code><ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer></code></pre><button><span>Copy</span></button></div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div></div></div></div></div>
<h3>Add an Axis</h3>
<p>To add an x-axis to the chart, we'll use the <code>XAxis</code> component.</p>
<div><h3>Import the <code>XAxis</code> component.</h3><div><pre><code>import { Bar, BarChart, CartesianGrid,XAxis} from "recharts"</code></pre><button><span>Copy</span></button></div><h3>Add the <code>XAxis</code> component to your chart.</h3><div><pre><code><ChartContainer config={chartConfig} className="h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer></code></pre><button><span>Copy</span></button></div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div></div></div></div></div>
<h3>Add Tooltip</h3>
<p>So far we've only used components from Recharts. They look great out of the box thanks to some customization in the <code>chart</code> component.</p>
<p>To add a tooltip, we'll use the custom <code>ChartTooltip</code> and <code>ChartTooltipContent</code> components from <code>chart</code>.</p>
<div><h3>Import the <code>ChartTooltip</code> and <code>ChartTooltipContent</code> components.</h3><div><pre><code>import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"</code></pre><button><span>Copy</span></button></div><h3>Add the components to your chart.</h3><div><pre><code><ChartContainer config={chartConfig} className="h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer></code></pre><button><span>Copy</span></button></div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div></div></div></div><p>Hover to see the tooltips. Easy, right? Two components, and we've got a beautiful tooltip.</p></div>
<h3>Add Legend</h3>
<p>We'll do the same for the legend. We'll use the <code>ChartLegend</code> and <code>ChartLegendContent</code> components from <code>chart</code>.</p>
<div><h3>Import the <code>ChartLegend</code> and <code>ChartLegendContent</code> components.</h3><div><pre><code>import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"</code></pre><button><span>Copy</span></button></div><h3>Add the components to your chart.</h3><div><pre><code><ChartContainer config={chartConfig} className="h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer></code></pre><button><span>Copy</span></button></div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div></div></div></div></div>
<p>Done. You've built your first chart! What's next?</p>

<h2>Chart Config</h2>
<p>The chart config is where you define the labels, icons and colors for a chart.</p>
<p>It is intentionally decoupled from chart data.</p>
<p>This allows you to share config and color tokens between charts. It can also works independently for cases where your data or color tokens live remotely or in a different format.</p>
<div><pre><code>import { Monitor } from "lucide-react"

import { typeChartConfig} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    icon: Monitor,
    // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
    color: "#2563eb",
    // OR a theme object with 'light' and 'dark' keys
    theme: {
      light: "#2563eb",
      dark: "#dc2626",
    },
  },
} satisfiesChartConfig</code></pre><button><span>Copy</span></button></div>
<h2>Theming</h2>
<p>Charts has built-in support for theming. You can use css variables (recommended) or color values in any color format, such as hex, hsl or oklch.</p>
<h3>CSS Variables</h3>
<div><h3>Define your colors in your css file</h3><div><div>globals.css</div><pre><code>@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    // ...
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
  }

  .dark: {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 100%;
    // ...
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
  }
}</code></pre><button><span>Copy</span></button></div><h3>Add the color to your <code>chartConfig</code></h3><div><pre><code>const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig</code></pre><button><span>Copy</span></button></div><div><div><p>We're wrapping the value in <code>hsl()</code> here because we define the colors without color space function.</p><p>This is not required. You can use full color values, such as hex, hsl or oklch.</p><div><pre><code>--chart-1: oklch(70% 0.227 154.59);</code></pre><button><span>Copy</span></button></div><div><pre><code>color: "var(--chart-1)",</code></pre><button><span>Copy</span></button></div></div></div></div>
<h3>hex, hsl or oklch</h3>
<p>You can also define your colors directly in the chart config. Use the color format you prefer.</p>
<div><pre><code>const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig</code></pre><button><span>Copy</span></button></div>
<h3>Using Colors</h3>
<p>To use the theme colors in your chart, reference the colors using the format <code>var(--color-KEY)</code>.</p>
<h4>Components</h4>
<div><pre><code><Bar dataKey="desktop" fill="var(--color-desktop)" /></code></pre><button><span>Copy</span></button></div>
<h4>Chart Data</h4>
<div><pre><code>const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]</code></pre><button><span>Copy</span></button></div>
<h4>Tailwind</h4>
<div><pre><code><LabelList className="fill-[--color-desktop]" /></code></pre><button><span>Copy</span></button></div>
<h2>Tooltip</h2>
<p>A chart tooltip contains a label, name, indicator and value. You can use a combination of these to customize your tooltip.</p>
<div><div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div>Label</div><div><div>Page Views</div><div><div><div><div><span>Desktop</span></div><span>186</span></div></div><div><div><div><span>Mobile</span></div><span>80</span></div></div></div></div></div><div><div>Name</div><div><div><div><div><div><span>Chrome</span></div><span>1,286</span></div></div><div><div><div><span>Firefox</span></div><span>1,000</span></div></div></div></div></div><div><div><div><div><div><div><div>Page Views</div><span>Desktop</span></div><span>12,486</span></div></div></div></div></div><div><div>Indicator</div><div><div><div><div><div><span>Chrome</span></div><span>1,286</span></div></div></div></div></div></div><!--/$--></div></div></div></div></div>
<p>You can turn on/off any of these using the <code>hideLabel</code>, <code>hideIndicator</code> props and customize the indicator style using the <code>indicator</code> prop.</p>
<p>Use <code>labelKey</code> and <code>nameKey</code> to use a custom key for the tooltip label and name.</p>
<p>Chart comes with the <code><ChartTooltip></code> and <code><ChartTooltipContent></code> components. You can use these two components to add custom tooltips to your chart.</p>
<div><pre><code>import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><ChartTooltip content={<ChartTooltipContent />} /></code></pre><button><span>Copy</span></button></div>
<h3>Props</h3>
<p>Use the following props to customize the tooltip.</p>
<div><table><thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>labelKey</code></td><td>string</td><td>The config or data key to use for the label.</td></tr><tr><td><code>nameKey</code></td><td>string</td><td>The config or data key to use for the name.</td></tr><tr><td><code>indicator</code></td><td><code>dot</code> <code>line</code> or <code>dashed</code></td><td>The indicator style for the tooltip.</td></tr><tr><td><code>hideLabel</code></td><td>boolean</td><td>Whether to hide the label.</td></tr><tr><td><code>hideIndicator</code></td><td>boolean</td><td>Whether to hide the indicator.</td></tr></tbody></table></div>
<h3>Colors</h3>
<p>Colors are automatically referenced from the chart config.</p>
<h3>Custom</h3>
<p>To use a custom key for tooltip label and names, use the <code>labelKey</code> and <code>nameKey</code> props.</p>
<div><pre><code>const chartData = [
  {browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  {browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfig = {
  visitors: {
    label: "Total Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig</code></pre><button><span>Copy</span></button></div>
<div><pre><code><ChartTooltip
  content={<ChartTooltipContent labelKey="visitors" nameKey="browser" />}
/></code></pre><button><span>Copy</span></button></div>
<p>This will use <code>Total Visitors</code> for label and <code>Chrome</code> and <code>Safari</code> for the tooltip names.</p>
<h2>Legend</h2>
<p>You can use the custom <code><ChartLegend></code> and <code><ChartLegendContent></code> components to add a legend to your chart.</p>
<div><pre><code>import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><ChartLegend content={<ChartLegendContent />} /></code></pre><button><span>Copy</span></button></div>
<h3>Colors</h3>
<p>Colors are automatically referenced from the chart config.</p>
<h3>Custom</h3>
<p>To use a custom key for legend names, use the <code>nameKey</code> prop.</p>
<div><pre><code>const chartData = [
  {browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  {browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfig = {
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig</code></pre><button><span>Copy</span></button></div>
<div><pre><code><ChartLegend content={<ChartLegendContent nameKey="browser" />} /></code></pre><button><span>Copy</span></button></div>
<p>This will use <code>Chrome</code> and <code>Safari</code> for the legend names.</p>
<h2>Accessibility</h2>
<p>You can turn on the <code>accessibilityLayer</code> prop to add an accessible layer to your chart.</p>
<p>This prop adds keyboard access and screen reader support to your charts.</p>
<div><pre><code><LineChart accessibilityLayer /></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/checkbox
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Checkbox</div></div><div><h1>Checkbox</h1><p><span>A control that allows the user to toggle between checked and not checked.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><label>Accept terms and conditions</label></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add checkbox</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Checkbox } from "@/components/ui/checkbox"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Checkbox /></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>With text</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><label>Accept terms and conditions</label><p>You agree to our Terms of Service and Privacy Policy.</p></div></div><!--/$--></div></div></div></div></div>
<h3>Disabled</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><label>Accept terms and conditions</label></div><!--/$--></div></div></div></div></div>
<h3>Form</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><form><div><div><label>Use different settings for my mobile devices</label><p>You can manage your mobile notifications in the<!-- -->  page.</p></div></div><button>Submit</button></form><!--/$--></div></div></div></div></div>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><form><div><div><label>Sidebar</label><p>Select the items you want to display in the sidebar.</p></div><div><label>Recents</label></div><div><label>Home</label></div><div><label>Applications</label></div><div><label>Desktop</label></div><div><label>Downloads</label></div><div><label>Documents</label></div></div><button>Submit</button></form><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/collapsible
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Collapsible</div></div><div><h1>Collapsible</h1><p><span>An interactive component which expands/collapses a panel.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><h4>@peduarte starred 3 repositories</h4><button><span>Toggle</span></button></div><div>@radix-ui/primitives</div></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add collapsible</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </CollapsibleContent>
</Collapsible></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/combobox
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Combobox</div></div><div><h1>Combobox</h1><p><span>Autocomplete input and command palette with a list of suggestions.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Select framework...</button><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<p>The Combobox is built using a composition of the <code><Popover /></code> and the <code><Command /></code> components.</p>
<p>See installation instructions for the  and the  components.</p>
<h2>Usage</h2>
<div><pre><code>"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}</code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Combobox</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Select framework...</button><!--/$--></div></div></div></div></div>
<h3>Popover</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><div><p>Status</p><button>+ Set status</button></div><!--/$--></div></div></div></div></div>
<h3>Dropdown menu</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><p><span>feature</span><span>Create a new project</span></p></div><!--/$--></div></div></div></div></div>
<h3>Responsive</h3>
<p>You can create a responsive combobox by using the <code><Popover /></code> on desktop and the <code><Drawer /></code> components on mobile.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><button>+ Set status</button><!--/$--></div></div></div></div></div>
<h3>Form</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><form><div><label>Language</label><button>Select language</button><p>This is the language that will be used in the dashboard.</p></div><button>Submit</button></form><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/command
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Command</div></div><div><h1>Command</h1><p><span>Fast, composable, unstyled command menu for React.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><div>No results found.</div><div><div>Suggestions</div><div><div><span>Calendar</span></div><div><span>Search Emoji</span></div><div><span>Calculator</span></div></div></div><div><div>Settings</div><div><div><span>Profile</span><span>⌘P</span></div><div><span>Billing</span><span>⌘B</span></div><div><span>Settings</span><span>⌘S</span></div></div></div></div></div></div><!--/$--></div></div></div></div></div>
<h2>About</h2>
<p>The <code><Command /></code> component uses the  component by .</p>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add command</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Dialog</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><p>Press<!-- --> <kbd><span>⌘</span>J</kbd></p><!--/$--></div></div></div></div></div>
<p>To show the command menu in a dialog, use the <code><CommandDialog /></code> component.</p>
<div><pre><code>export function CommandMenu() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}</code></pre><button><span>Copy</span></button></div>
<h3>Combobox</h3>
<p>You can use the <code><Command /></code> component as a combobox. See the  page for more information.</p></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/context-menu
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Context Menu</div></div><div><h1>Context Menu</h1><p><span>Displays a menu to the user — such as a set of actions or functions — triggered by a button.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><span>Right click here</span><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add context-menu</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/data-table
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Data Table</div></div><div><h1>Data Table</h1><p><span>Powerful table and datagrids built using TanStack Table.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><button>Columns </button></div><div><div><table><thead><tr><th>Status</th><th><button>Email</button></th><th><div>Amount</div></th></tr></thead><tbody><tr><td><div>success</div></td><td><div>ken99@yahoo.com</div></td><td><div>$316.00</div></td><td><button><span>Open menu</span></button></td></tr><tr><td><div>success</div></td><td><div>Abe45@gmail.com</div></td><td><div>$242.00</div></td><td><button><span>Open menu</span></button></td></tr><tr><td><div>processing</div></td><td><div>Monserrat44@gmail.com</div></td><td><div>$837.00</div></td><td><button><span>Open menu</span></button></td></tr><tr><td><div>success</div></td><td><div>Silas22@gmail.com</div></td><td><div>$874.00</div></td><td><button><span>Open menu</span></button></td></tr><tr><td><div>failed</div></td><td><div>carmella@hotmail.com</div></td><td><div>$721.00</div></td><td><button><span>Open menu</span></button></td></tr></tbody></table></div></div><div><div>0<!-- --> of<!-- --> <!-- -->5<!-- --> row(s) selected.</div><div><button>Previous</button><button>Next</button></div></div></div><!--/$--></div></div></div></div></div>
<h2>Introduction</h2>
<p>Every data table or datagrid I've created has been unique. They all behave differently, have specific sorting and filtering requirements, and work with different data sources.</p>
<p>It doesn't make sense to combine all of these variations into a single component. If we do that, we'll lose the flexibility that  provides.</p>
<p>So instead of a data-table component, I thought it would be more helpful to provide a guide on how to build your own.</p>
<p>We'll start with the basic <code><Table /></code> component and build a complex data table from scratch.</p>
<div><div><p><strong>Tip:</strong> If you find yourself using the same table in multiple places in your app, you can always extract it into a reusable component.</p></div></div>
<h2>Table of Contents</h2>
<p>This guide will show you how to use  and the <code><Table /></code> component to build your own custom data table. We'll cover the following topics:</p>

<h2>Installation</h2>
<ol>
<li>Add the <code><Table /></code> component to your project:</li>
</ol>
<div><pre><code>npx shadcn@latest add table</code></pre><button><span>Copy</span></button></div>
<ol>
<li>Add <code>tanstack/react-table</code> dependency:</li>
</ol>
<div><pre><code>npm install @tanstack/react-table</code></pre><button><span>Copy</span></button></div>
<h2>Prerequisites</h2>
<p>We are going to build a table to show recent payments. Here's what our data looks like:</p>
<div><pre><code>type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
]</code></pre><button><span>Copy</span></button></div>
<h2>Project Structure</h2>
<p>Start by creating the following file structure:</p>
<div><pre><code>app
└── payments
    ├── columns.tsx
    ├── data-table.tsx
    └── page.tsx</code></pre><button><span>Copy</span></button></div>
<p>I'm using a Next.js example here but this works for any other React framework.</p>
<ul>
<li><code>columns.tsx</code> (client component) will contain our column definitions.</li>
<li><code>data-table.tsx</code> (client component) will contain our <code><DataTable /></code> component.</li>
<li><code>page.tsx</code> (server component) is where we'll fetch data and render our table.</li>
</ul>
<h2>Basic Table</h2>
<p>Let's start by building a basic table.</p>
<div><h3>Column Definitions</h3><p>First, we'll define our columns.</p><div><div>app/payments/columns.tsx</div><pre><code>"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]</code></pre><button><span>Copy</span></button></div><div><div><p><strong>Note:</strong> Columns are where you define the core of what your table
will look like. They define the data that will be displayed, how it will be
formatted, sorted and filtered.</p></div></div><h3><code><DataTable /></code> component</h3><p>Next, we'll create a <code><DataTable /></code> component to render our table.</p><div><div>app/payments/data-table.tsx</div><pre><code>"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}</code></pre><button><span>Copy</span></button></div><div><div><p><strong>Tip</strong>: If you find yourself using <code><DataTable /></code> in multiple places, this is the component you could make reusable by extracting it to <code>components/ui/data-table.tsx</code>.</p><p><code><DataTable columns={columns} data={data} /></code></p></div></div><h3>Render the table</h3><p>Finally, we'll render our table in our page component.</p><div><div>app/payments/page.tsx</div><pre><code>import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}</code></pre><button><span>Copy</span></button></div></div>
<h2>Cell Formatting</h2>
<p>Let's format the amount cell to display the dollar amount. We'll also align the cell to the right.</p>
<div><h3>Update columns definition</h3><p>Update the <code>header</code> and <code>cell</code> definitions for amount as follows:</p><div><div>app/payments/columns.tsx</div><pre><code>export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]</code></pre><button><span>Copy</span></button></div><p>You can use the same approach to format other cells and headers.</p></div>
<h2>Row Actions</h2>
<p>Let's add row actions to our table. We'll use a <code><Dropdown /></code> component for this.</p>
<div><h3>Update columns definition</h3><p>Update our columns definition to add a new <code>actions</code> column. The <code>actions</code> cell returns a <code><Dropdown /></code> component.</p><div><div>app/payments/columns.tsx</div><pre><code>"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Payment>[] = [
  // ...
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  // ...
]</code></pre><button><span>Copy</span></button></div><p>You can access the row data using <code>row.original</code> in the <code>cell</code> function. Use this to handle actions for your row eg. use the <code>id</code> to make a DELETE call to your API.</p></div>
<h2>Pagination</h2>
<p>Next, we'll add pagination to our table.</p>
<div><h3>Update <code><DataTable></code></h3><div><div>app/payments/data-table.tsx</div><pre><code>import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // ...
}</code></pre><button><span>Copy</span></button></div><p>This will automatically paginate your rows into pages of 10. See the  for more information on customizing page size and implementing manual pagination.</p><h3>Add pagination controls</h3><p>We can add pagination controls to our table using the <code><Button /></code> component and the <code>table.previousPage()</code>, <code>table.nextPage()</code> API methods.</p><div><div>app/payments/data-table.tsx</div><pre><code>import { Button } from "@/components/ui/button"

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          { // .... }
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}</code></pre><button><span>Copy</span></button></div><p>See  section for a more advanced pagination component.</p></div>
<h2>Sorting</h2>
<p>Let's make the email column sortable.</p>
<div><h3>Update <code><DataTable></code></h3><div><div>app/payments/data-table.tsx</div><pre><code>"use client"

import * as React from "react"
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>{ ... }</Table>
      </div>
    </div>
  )
}</code></pre><button><span>Copy</span></button></div><h3>Make header cell sortable</h3><p>We can now update the <code>email</code> header cell to add sorting controls.</p><div><div>app/payments/columns.tsx</div><pre><code>"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]</code></pre><button><span>Copy</span></button></div><p>This will automatically sort the table (asc and desc) when the user toggles on the header cell.</p></div>
<h2>Filtering</h2>
<p>Let's add a search input to filter emails in our table.</p>
<div><h3>Update <code><DataTable></code></h3><div><div>app/payments/data-table.tsx</div><pre><code>"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>{ ... }</Table>
      </div>
    </div>
  )
}</code></pre><button><span>Copy</span></button></div><p>Filtering is now enabled for the <code>email</code> column. You can add filters to other columns as well. See the  for more information on customizing filters.</p></div>
<h2>Visibility</h2>
<p>Adding column visibility is fairly simple using <code>@tanstack/react-table</code> visibility API.</p>
<div><h3>Update <code><DataTable></code></h3><div><div>app/payments/data-table.tsx</div><pre><code>"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() as string}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>{ ... }</Table>
      </div>
    </div>
  )
}</code></pre><button><span>Copy</span></button></div><p>This adds a dropdown menu that you can use to toggle column visibility.</p></div>
<h2>Row Selection</h2>
<p>Next, we're going to add row selection to our table.</p>
<div><h3>Update column definitions</h3><div><div>app/payments/columns.tsx</div><pre><code>"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
]</code></pre><button><span>Copy</span></button></div><h3>Update <code><DataTable></code></h3><div><div>app/payments/data-table.tsx</div><pre><code>export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table />
      </div>
    </div>
  )
}</code></pre><button><span>Copy</span></button></div><p>This adds a checkbox to each row and a checkbox in the header to select all rows.</p><h3>Show selected rows</h3><p>You can show the number of selected rows using the <code>table.getFilteredSelectedRowModel()</code> API.</p><div><pre><code><div className="flex-1 text-sm text-muted-foreground">
  {table.getFilteredSelectedRowModel().rows.length} of{" "}
  {table.getFilteredRowModel().rows.length} row(s) selected.
</div></code></pre><button><span>Copy</span></button></div></div>
<h2>Reusable Components</h2>
<p>Here are some components you can use to build your data tables. This is from the  demo.</p>
<h3>Column header</h3>
<p>Make any column header sortable and hideable.</p>
<div><div><div><div><div><pre><code>import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}</code></pre><button><span>Copy</span></button></div></div></div><div><button>Expand</button></div></div></div>
<div><pre><code>export const columns = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
]</code></pre><button><span>Copy</span></button></div>
<h3>Pagination</h3>
<p>Add pagination controls to your table including page size and selection count.</p>
<div><div><div><div><div><pre><code>import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/registry/new-york/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}</code></pre><button><span>Copy</span></button></div></div></div><div><button>Expand</button></div></div></div>
<div><pre><code><DataTablePagination table={table} /></code></pre><button><span>Copy</span></button></div>
<h3>Column toggle</h3>
<p>A component to toggle column visibility.</p>
<div><div><div><div><div><pre><code>"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/registry/new-york/ui/dropdown-menu"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}</code></pre><button><span>Copy</span></button></div></div></div><div><button>Expand</button></div></div></div>
<div><pre><code><DataTableViewOptions table={table} /></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/date-picker
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Date Picker</div></div><div><h1>Date Picker</h1><p><span>A date picker component with range and presets.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button><span>Pick a date</span></button><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<p>The Date Picker is built using a composition of the <code><Popover /></code> and the <code><Calendar /></code> components.</p>
<p>See installation instructions for the  and the  components.</p>
<h2>Usage</h2>
<div><pre><code>"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}</code></pre><button><span>Copy</span></button></div>
<p>See the  documentation for more information.</p>
<h2>Examples</h2>
<h3>Date Picker</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button><span>Pick a date</span></button><!--/$--></div></div></div></div></div>
<h3>Date Range Picker</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><button>Jan 20, 2022<!-- --> -<!-- --> <!-- -->Feb 09, 2022</button></div><!--/$--></div></div></div></div></div>
<h3>With Presets</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button><span>Pick a date</span></button><!--/$--></div></div></div></div></div>
<h3>Form</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><form><div><label>Date of birth</label><button><span>Pick a date</span></button><p>Your date of birth is used to calculate your age.</p></div><button>Submit</button></form><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/dialog
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Dialog</div></div><div><h1>Dialog</h1><p><span>A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Edit Profile</button><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add dialog</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Custom close button</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><button>Share</button><!--/$--></div></div></div></div></div>
<h2>Notes</h2>
<p>To activate the <code>Dialog</code> component from within a <code>Context Menu</code> or <code>Dropdown Menu</code>, you must encase the <code>Context Menu</code> or
<code>Dropdown Menu</code> component in the <code>Dialog</code> component. For more information, refer to the linked issue .</p>
<div><pre><code><Dialog>
  <ContextMenu>
    <ContextMenuTrigger>Right click</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Open</ContextMenuItem>
      <ContextMenuItem>Download</ContextMenuItem>
      <DialogTrigger asChild>
        <ContextMenuItem>
          <span>Delete</span>
        </ContextMenuItem>
      </DialogTrigger>
    </ContextMenuContent>
  </ContextMenu>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. Are you sure you want to permanently
        delete this file from our servers?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button type="submit">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/drawer
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Drawer</div></div><div><h1>Drawer</h1><p><span>A drawer component for React.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Open Drawer</button><!--/$--></div></div></div></div></div>
<h2>About</h2>
<p>Drawer is built on top of  by .</p>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add drawer</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Responsive Dialog</h3>
<p>You can combine the <code>Dialog</code> and <code>Drawer</code> components to create a responsive dialog. This renders a <code>Dialog</code> component on desktop and a <code>Drawer</code> on mobile.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><button>Edit Profile</button><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/dropdown-menu
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Dropdown Menu</div></div><div><h1>Dropdown Menu</h1><p><span>Displays a menu to the user — such as a set of actions or functions — triggered by a button.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Open</button><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add dropdown-menu</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Checkboxes</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Open</button><!--/$--></div></div></div></div></div>
<h3>Radio Group</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Open</button><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/form
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>React Hook Form</div></div><div><h1>React Hook Form</h1><p><span>Building forms with React Hook Form and Zod.</span></p></div><div><div><p>Forms are tricky. They are one of the most common things you'll build in a web application, but also one of the most complex.</p>
<p>Well-designed HTML forms are:</p>
<ul>
<li>Well-structured and semantically correct.</li>
<li>Easy to use and navigate (keyboard).</li>
<li>Accessible with ARIA attributes and proper labels.</li>
<li>Has support for client and server side validation.</li>
<li>Well-styled and consistent with the rest of the application.</li>
</ul>
<p>In this guide, we will take a look at building forms with  and . We're going to use a <code><FormField></code> component to compose accessible forms using Radix UI components.</p>
<h2>Features</h2>
<p>The <code><Form /></code> component is a wrapper around the <code>react-hook-form</code> library. It provides a few things:</p>
<ul>
<li>Composable components for building forms.</li>
<li>A <code><FormField /></code> component for building controlled form fields.</li>
<li>Form validation using <code>zod</code>.</li>
<li>Handles accessibility and error messages.</li>
<li>Uses <code>React.useId()</code> for generating unique IDs.</li>
<li>Applies the correct <code>aria</code> attributes to form fields based on states.</li>
<li>Built to work with all Radix UI components.</li>
<li>Bring your own schema library. We use <code>zod</code> but you can use anything you want.</li>
<li><strong>You have full control over the markup and styling.</strong></li>
</ul>
<h2>Anatomy</h2>
<div><pre><code><Form>
  <FormField
    control={...}
    name="..."
    render={() => (
      <FormItem>
        <FormLabel />
        <FormControl>
          { /* Your form field */}
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />
</Form></code></pre><button><span>Copy</span></button></div>
<h2>Example</h2>
<div><pre><code>const form = useForm()

<FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input placeholder="shadcn" {...field} />
      </FormControl>
      <FormDescription>This is your public display name.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/></code></pre><button><span>Copy</span></button></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><h3>Command</h3><div><pre><code>npx shadcn@latest add form</code></pre><button><span>Copy</span></button></div></div></div></div>
<h2>Usage</h2>
<div><h3>Create a form schema</h3><p>Define the shape of your form using a Zod schema. You can read more about using Zod in the .</p><div><pre><code>"use client"

import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})</code></pre><button><span>Copy</span></button></div><h3>Define a form</h3><p>Use the <code>useForm</code> hook from <code>react-hook-form</code> to create a form.</p><div><pre><code>"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
}</code></pre><button><span>Copy</span></button></div><p>Since <code>FormField</code> is using a controlled component, you need to provide a default value for the field. See the  to learn more about controlled components.</p><h3>Build your form</h3><p>We can now use the <code><Form /></code> components to build our form.</p><div><pre><code>"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  // ...

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}</code></pre><button><span>Copy</span></button></div><h3>Done</h3><p>That's it. You now have a fully accessible form that is type-safe with client-side validation.</p><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><form><div><label>Username</label><p>This is your public display name.</p></div><button>Submit</button></form><!--/$--></div></div></div></div></div></div>
<h2>Examples</h2>
<p>See the following links for more examples on how to use the <code><Form /></code> component with other components:</p>
</div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/hover-card
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Hover Card</div></div><div><h1>Hover Card</h1><p><span>For sighted users to preview content available behind a link.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>@nextjs</button><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add hover-card</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>
    The React Framework – created and maintained by @vercel.
  </HoverCardContent>
</HoverCard></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/input
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Input</div></div><div><h1>Input</h1><p><span>Displays a form input field or a component that looks like an input field.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add input</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Input } from "@/components/ui/input"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Input /></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Default</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>File</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><label>Picture</label></div><!--/$--></div></div></div></div></div>
<h3>Disabled</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>With Label</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><label>Email</label></div><!--/$--></div></div></div></div></div>
<h3>With Button</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><button>Subscribe</button></div><!--/$--></div></div></div></div></div>
<h3>Form</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><form><div><label>Username</label><p>This is your public display name.</p></div><button>Submit</button></form><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/input-otp
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Input OTP</div></div><div><h1>Input OTP</h1><p><span>Accessible one-time password component with copy paste functionality.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h2>About</h2>
<p>Input OTP is built on top of  by .</p>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><h3>Run the following command:</h3><div><pre><code>npx shadcn@latest add input-otp</code></pre><button><span>Copy</span></button></div><h3>Update <code>tailwind.config.js</code></h3><p>Add the following animations to your <code>tailwind.config.js</code> file:</p><div><div>tailwind.config.js</div><pre><code>/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
}</code></pre><button><span>Copy</span></button></div></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Pattern</h3>
<p>Use the <code>pattern</code> prop to define a custom pattern for the OTP input.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<div><pre><code>import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

...

<InputOTP
  maxLength={6}
  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    {/* ... */}
  </InputOTPGroup>
</InputOTP></code></pre><button><span>Copy</span></button></div>
<h3>Separator</h3>
<p>You can use the <code><InputOTPSeparator /></code> component to add a separator between the input groups.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<div><pre><code>import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

...

<InputOTP maxLength={4}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP></code></pre><button><span>Copy</span></button></div>
<h3>Controlled</h3>
<p>You can use the <code>value</code> and <code>onChange</code> props to control the input value.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><div><div>Enter your one-time password.</div></div><!--/$--></div></div></div></div></div>
<h3>Form</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><form><div><label>One-Time Password</label><p>Please enter the one-time password sent to your phone.</p></div><button>Submit</button></form><!--/$--></div></div></div></div></div>
<h2>Changelog</h2>
<h3>2024-03-19 Composition</h3>
<p>We've made some updates and replaced the render props pattern with composition. Here's how to update your code if you prefer the composition pattern.</p>
<div><div><p><strong>Note:</strong> You are not required to update your code if you are using the
<code>render</code> prop. It is still supported.</p></div></div>
<div><h3>Update to the latest version of <code>input-otp</code>.</h3><div><pre><code>npm install input-otp@latest</code></pre><button><span>Copy</span></button></div><h3>Update <code>input-otp.tsx</code></h3><div><div>input-otp.tsx</div><pre><code>- import { OTPInput, SlotProps } from "input-otp"
+ import { OTPInput, OTPInputContext } from "input-otp"

 const InputOTPSlot = React.forwardRef<
   React.ElementRef<"div">,
-   SlotProps & React.ComponentPropsWithoutRef<"div">
-  >(({ char, hasFakeCaret, isActive, className, ...props }, ref) => {
+   React.ComponentPropsWithoutRef<"div"> & { index: number }
+  >(({ index, className, ...props }, ref) => {
+   const inputOTPContext = React.useContext(OTPInputContext)
+   const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]</code></pre><button><span>Copy</span></button></div><h3>Then replace the <code>render</code> prop in your code.</h3><div><pre><code><InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP></code></pre><button><span>Copy</span></button></div></div>
<h3>2024-03-19 Disabled</h3>
<p>To add a disabled state to the input, update <code><InputOTP /></code> as follows:</p>
<div><div>input-otp.tsx</div><pre><code>const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"</code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/label
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Label</div></div><div><h1>Label</h1><p><span>Renders an accessible label associated with controls.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><label>Accept terms and conditions</label></div></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add label</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Label } from "@/components/ui/label"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Label htmlFor="email">Your email address</Label></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/menubar
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Menubar</div></div><div><h1>Menubar</h1><p><span>A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><button>File</button><button>Edit</button><button>View</button><button>Profiles</button></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add menubar</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/navigation-menu
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Navigation Menu</div></div><div><h1>Navigation Menu</h1><p><span>A collection of links for navigating websites.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><nav><div><ul><li><button>Getting started<!-- --> </button></li><li><button>Components<!-- --> </button></li></ul></div></nav><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add navigation-menu</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Link Component</h3>
<p>When using the Next.js <code><Link /></code> component, you can use <code>navigationMenuTriggerStyle()</code> to apply the correct styles to the trigger.</p>
<div><pre><code>import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><NavigationMenuItem>
  <Link href="/docs" legacyBehavior passHref>
    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
      Documentation
    </NavigationMenuLink>
  </Link>
</NavigationMenuItem></code></pre><button><span>Copy</span></button></div>
<p>See also the  for handling client side routing.</p></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/pagination
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Pagination</div></div><div><h1>Pagination</h1><p><span>Pagination with page navigation, next and previous links.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><nav><ul><li><span><span>More pages</span></span></li></ul></nav><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add pagination</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination></code></pre><button><span>Copy</span></button></div>
<h3>Next.js</h3>
<p>By default the <code><PaginationLink /></code> component will render an <code><a /></code> tag.</p>
<p>To use the Next.js <code><Link /></code> component, make the following updates to <code>pagination.tsx</code>.</p>
<div><pre><code>+ import Link from "next/link"

- type PaginationLinkProps = ... & React.ComponentProps<"a">
+ type PaginationLinkProps = ... & React.ComponentProps<typeof Link>

const PaginationLink = ({...props }: ) => (
  <PaginationItem>
-   <a>
+   <Link>
      // ...
-   </a>
+   </Link>
  </PaginationItem>
)
</code></pre><button><span>Copy</span></button></div>
<div><div><p><strong>Note:</strong> We are making updates to the cli to automatically do this for you.</p></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/popover
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Popover</div></div><div><h1>Popover</h1><p><span>Displays rich content in a portal, triggered by a button.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Open popover</button><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add popover</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Place content for the popover here.</PopoverContent>
</Popover></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/progress
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Progress</div></div><div><h1>Progress</h1><p><span>Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add progress</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Progress } from "@/components/ui/progress"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Progress value={33} /></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/radio-group
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Radio Group</div></div><div><h1>Radio Group</h1><p><span>A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><label>Default</label></div><div><label>Comfortable</label></div><div><label>Compact</label></div></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add radio-group</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Form</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><form><div><label>Notify me about...</label><div><div><label>All new messages</label></div><div><label>Direct messages and mentions</label></div><div><label>Nothing</label></div></div></div><button>Submit</button></form><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/resizable
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Resizable</div></div><div><h1>Resizable</h1><p><span>Accessible resizable panel groups and layouts with keyboard support.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><span>One</span></div></div><div><div><div><div><span>Two</span></div></div><div><div><span>Three</span></div></div></div></div></div><!--/$--></div></div></div></div></div>
<h2>About</h2>
<p>The <code>Resizable</code> component is built on top of  by .</p>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add resizable</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><ResizablePanelGroup direction="horizontal">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Vertical</h3>
<p>Use the <code>direction</code> prop to set the direction of the resizable panels.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><span>Header</span></div></div><div><div><span>Content</span></div></div></div><!--/$--></div></div></div></div></div>
<div><pre><code>import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Example() {
  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel>One</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>Two</ResizablePanel>
    </ResizablePanelGroup>
  )
}</code></pre><button><span>Copy</span></button></div>
<h3>Handle</h3>
<p>You can set or hide the handle by using the <code>withHandle</code> prop on the <code>ResizableHandle</code> component.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><span>Sidebar</span></div></div><div><div><span>Content</span></div></div></div><!--/$--></div></div></div></div></div>
<div><pre><code>import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Example() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>One</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>Two</ResizablePanel>
    </ResizablePanelGroup>
  )
}</code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/scroll-area
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Scroll-area</div></div><div><h1>Scroll-area</h1><p><span>Augments native scroll functionality for custom, cross-browser styling.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><div><h4>Tags</h4><div>v1.2.0-beta.50</div><div>v1.2.0-beta.49</div><div>v1.2.0-beta.48</div><div>v1.2.0-beta.47</div><div>v1.2.0-beta.46</div><div>v1.2.0-beta.45</div><div>v1.2.0-beta.44</div><div>v1.2.0-beta.43</div><div>v1.2.0-beta.42</div><div>v1.2.0-beta.41</div><div>v1.2.0-beta.40</div><div>v1.2.0-beta.39</div><div>v1.2.0-beta.38</div><div>v1.2.0-beta.37</div><div>v1.2.0-beta.36</div><div>v1.2.0-beta.35</div><div>v1.2.0-beta.34</div><div>v1.2.0-beta.33</div><div>v1.2.0-beta.32</div><div>v1.2.0-beta.31</div><div>v1.2.0-beta.30</div><div>v1.2.0-beta.29</div><div>v1.2.0-beta.28</div><div>v1.2.0-beta.27</div><div>v1.2.0-beta.26</div><div>v1.2.0-beta.25</div><div>v1.2.0-beta.24</div><div>v1.2.0-beta.23</div><div>v1.2.0-beta.22</div><div>v1.2.0-beta.21</div><div>v1.2.0-beta.20</div><div>v1.2.0-beta.19</div><div>v1.2.0-beta.18</div><div>v1.2.0-beta.17</div><div>v1.2.0-beta.16</div><div>v1.2.0-beta.15</div><div>v1.2.0-beta.14</div><div>v1.2.0-beta.13</div><div>v1.2.0-beta.12</div><div>v1.2.0-beta.11</div><div>v1.2.0-beta.10</div><div>v1.2.0-beta.9</div><div>v1.2.0-beta.8</div><div>v1.2.0-beta.7</div><div>v1.2.0-beta.6</div><div>v1.2.0-beta.5</div><div>v1.2.0-beta.4</div><div>v1.2.0-beta.3</div><div>v1.2.0-beta.2</div><div>v1.2.0-beta.1</div></div></div></div></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add scroll-area</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { ScrollArea } from "@/components/ui/scroll-area"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  Jokester began sneaking into the castle in the middle of the night and leaving
  jokes all over the place: under the king's pillow, in his soup, even in the
  royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
  then, one day, the people of the kingdom discovered that the jokes left by
  Jokester were so funny that they couldn't help but laugh. And once they
  started laughing, they couldn't stop.
</ScrollArea></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Horizontal Scrolling</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><div><div><figure><figcaption>Photo by<!-- --> <span>Ornella Binni</span></figcaption></figure><figure><figcaption>Photo by<!-- --> <span>Tom Byrom</span></figcaption></figure><figure><figcaption>Photo by<!-- --> <span>Vladimir Malyavko</span></figcaption></figure></div></div></div></div><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/select
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Select</div></div><div><h1>Select</h1><p><span>Displays a list of options for the user to pick from—triggered by a button.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button><span>Select a fruit</span></button><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add select</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Scrollable</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button><span>Select a timezone</span></button><!--/$--></div></div></div></div></div>
<h3>Form</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><form><div><label>Email</label><button><span>Select a verified email to display</span></button><p>You can manage email addresses in your<!-- --> .</p></div><button>Submit</button></form><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/separator
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Separator</div></div><div><h1>Separator</h1><p><span>Visually or semantically separates content.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><h4>Radix Primitives</h4><p>An open-source UI component library.</p></div><div><div>Blog</div><div>Docs</div><div>Source</div></div></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add separator</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Separator } from "@/components/ui/separator"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Separator /></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/sheet
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Sheet</div></div><div><h1>Sheet</h1><p><span>Extends the Dialog component to display content that complements the main content of the screen.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Open</button><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add sheet</code></pre><button><span>Copy</span></button></div></div></div>
<h3>Usage</h3>
<div><pre><code>import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Side</h3>
<p>Use the <code>side</code> property to <code><SheetContent /></code> to indicate the edge of the screen where the component will appear. The values can be <code>top</code>, <code>right</code>, <code>bottom</code> or <code>left</code>.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><div><button>top</button><button>right</button><button>bottom</button><button>left</button></div><!--/$--></div></div></div></div></div>
<h3>Size</h3>
<p>You can adjust the size of the sheet using CSS classes:</p>
<div><pre><code><Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent className="w-[400px] sm:w-[540px]">
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/skeleton
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Skeleton</div></div><div><h1>Skeleton</h1><p><span>Use to show a placeholder while content is loading.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add skeleton</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Skeleton } from "@/components/ui/skeleton"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Skeleton className="w-[100px] h-[20px] rounded-full" /></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Card</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/slider
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Slider</div></div><div><h1>Slider</h1><p><span>An input where the user selects a value from within a given range.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add slider</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Slider } from "@/components/ui/slider"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Slider defaultValue={[33]} max={100} step={1} /></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/sonner
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Sonner</div></div><div><h1>Sonner</h1><p><span>An opinionated toast component for React.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><button>Show Toast</button><!--/$--></div></div></div></div></div>
<h2>About</h2>
<p>Sonner is built and maintained by .</p>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><h3>Run the following command:</h3><div><pre><code>npx shadcn@latest add sonner</code></pre><button><span>Copy</span></button></div><h3>Add the Toaster component</h3><div><div>app/layout.tsx</div><pre><code>import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}</code></pre><button><span>Copy</span></button></div></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { toast } from "sonner"</code></pre><button><span>Copy</span></button></div>
<div><pre><code>toast("Event has been created.")</code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/switch
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Switch</div></div><div><h1>Switch</h1><p><span>A control that allows the user to toggle between checked and not checked.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><label>Airplane Mode</label></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add switch</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Switch } from "@/components/ui/switch"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Switch /></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Form</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><form><div><h3>Email Notifications</h3><div><div><div><label>Marketing emails</label><p>Receive emails about new products, features, and more.</p></div></div><div><div><label>Security emails</label><p>Receive emails about your account security.</p></div></div></div></div><button>Submit</button></form><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/table
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Table</div></div><div><h1>Table</h1><p><span>A responsive table component.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><table><caption>A list of your recent invoices.</caption><thead><tr><th>Invoice</th><th>Status</th><th>Method</th><th>Amount</th></tr></thead><tbody><tr><td>INV001</td><td>Paid</td><td>Credit Card</td><td>$250.00</td></tr><tr><td>INV002</td><td>Pending</td><td>PayPal</td><td>$150.00</td></tr><tr><td>INV003</td><td>Unpaid</td><td>Bank Transfer</td><td>$350.00</td></tr><tr><td>INV004</td><td>Paid</td><td>Credit Card</td><td>$450.00</td></tr><tr><td>INV005</td><td>Paid</td><td>PayPal</td><td>$550.00</td></tr><tr><td>INV006</td><td>Pending</td><td>Bank Transfer</td><td>$200.00</td></tr><tr><td>INV007</td><td>Unpaid</td><td>Credit Card</td><td>$300.00</td></tr></tbody><tfoot><tr><td>Total</td><td>$2,500.00</td></tr></tfoot></table></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add table</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table></code></pre><button><span>Copy</span></button></div>
<h2>Data Table</h2>
<p>You can use the <code><Table /></code> component to build more complex data tables. Combine it with  to create tables with sorting, filtering and pagination.</p>
<p>See the  documentation for more information.</p>
<p>You can also see an example of a data table in the  demo.</p></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/tabs
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Tabs</div></div><div><h1>Tabs</h1><p><span>A set of layered sections of content—known as tab panels—that are displayed one at a time.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><div><button>Account</button><button>Password</button></div><div><div><div><h3>Account</h3><p>Make changes to your account here. Click save when you're done.</p></div><div><div><label>Name</label></div><div><label>Username</label></div></div><div><button>Save changes</button></div></div></div></div><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add tabs</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/textarea
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Textarea</div></div><div><h1>Textarea</h1><p><span>Displays a form textarea or a component that looks like a textarea.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add textarea</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Textarea } from "@/components/ui/textarea"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Textarea /></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Default</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>Disabled</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>With Label</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><label>Your message</label></div><!--/$--></div></div></div></div></div>
<h3>With Text</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><label>Your Message</label><p>Your message will be copied to the support team.</p></div><!--/$--></div></div></div></div></div>
<h3>With Button</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><button>Send message</button></div><!--/$--></div></div></div></div></div>
<h3>Form</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><form><div><label>Bio</label><p>You can <span>@mention</span> other users and organizations.</p></div><button>Submit</button></form><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/toast
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Toast</div></div><div><h1>Toast</h1><p><span>A succinct message that is displayed temporarily.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><button>Add to calendar</button><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><h3>Run the following command:</h3><div><pre><code>npx shadcn@latest add toast</code></pre><button><span>Copy</span></button></div><h3>Add the Toaster component</h3><div><div>app/layout.tsx</div><pre><code>import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}</code></pre><button><span>Copy</span></button></div></div></div></div>
<h2>Usage</h2>
<p>The <code>useToast</code> hook returns a <code>toast</code> function that you can use to display a toast.</p>
<div><pre><code>import { useToast } from "@/hooks/use-toast"</code></pre><button><span>Copy</span></button></div>
<div><pre><code>export const ToastDemo = () => {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }}
    >
      Show Toast
    </Button>
  )
}</code></pre><button><span>Copy</span></button></div>
<div><div><p>To display multiple toasts at the same time, you can update the <code>TOAST_LIMIT</code> in <code>use-toast.tsx</code>.</p></div></div>
<h2>Examples</h2>
<h3>Simple</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><button>Show Toast</button><!--/$--></div></div></div></div></div>
<h3>With title</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><button>Show Toast</button><!--/$--></div></div></div></div></div>
<h3>With Action</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><button>Show Toast</button><!--/$--></div></div></div></div></div>
<h3>Destructive</h3>
<p>Use <code>toast({ variant: "destructive" })</code> to display a destructive toast.</p>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><button>Show Toast</button><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/toggle
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Toggle</div></div><div><h1>Toggle</h1><p><span>A two-state button that can be either on or off.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add toggle</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { Toggle } from "@/components/ui/toggle"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><Toggle>Toggle</Toggle></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Default</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>Outline</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>With Text</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Italic</button><!--/$--></div></div></div></div></div>
<h3>Small</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>Large</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>Disabled</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/toggle-group
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Toggle Group</div></div><div><h1>Toggle Group</h1><p><span>A set of two-state buttons that can be toggled on or off.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add toggle-group</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><ToggleGroup type="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup></code></pre><button><span>Copy</span></button></div>
<h2>Examples</h2>
<h3>Default</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>Outline</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>Single</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>Small</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>Large</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div>
<h3>Disabled</h3>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/tooltip
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Tooltip</div></div><div><h1>Tooltip</h1><p><span>A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><button>Hover</button><!--/$--></div></div></div></div></div>
<h2>Installation</h2>
<div><div><button>CLI</button><button>Manual</button></div><div><div><pre><code>npx shadcn@latest add tooltip</code></pre><button><span>Copy</span></button></div></div></div>
<h2>Usage</h2>
<div><pre><code>import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"</code></pre><button><span>Copy</span></button></div>
<div><pre><code><TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider></code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/components/typography
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Typography</div></div><div><h1>Typography</h1><p><span>Styles for headings, paragraphs, lists...etc</span></p></div><div><div><div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><form><button>Open in </button></form><button><span>Copy</span></button></div></div><div><div><!--$--><div><h1>The Joke Tax Chronicles</h1><p>Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.</p><h2>The King's Plan</h2><p>The king thought long and hard, and finally came up with<!-- --> : he would tax the jokes in the kingdom.</p><blockquote>"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."</blockquote><h3>The Joke Tax</h3><p>The king's subjects were not amused. They grumbled and complained, but the king was firm:</p><ul><li>1st level of puns: 5 gold coins</li><li>2nd level of jokes: 10 gold coins</li><li>3rd level of one-liners : 20 gold coins</li></ul><p>As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who refused to let the king's foolishness get him down: a court jester named Jokester.</p><h3>Jokester's Revolt</h3><p>Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.</p><p>And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.</p><h3>The People's Rebellion</h3><p>The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns again, and soon the entire kingdom was in on the joke.</p><div><table><thead><tr><th>King's Treasury</th><th>People's happiness</th></tr></thead><tbody><tr><td>Empty</td><td>Overflowing</td></tr><tr><td>Modest</td><td>Satisfied</td></tr><tr><td>Full</td><td>Ecstatic</td></tr></tbody></table></div><p>The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax. Jokester was declared a hero, and the kingdom lived happily ever after.</p><p>The moral of the story is: never underestimate the power of a good laugh and always be careful of bad ideas.</p></div><!--/$--></div></div></div></div></div>
<h2>h1</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><h1>Taxing Laughter: The Joke Tax Chronicles</h1><!--/$--></div></div></div></div></div>
<h2>h2</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><h2>The People of the Kingdom</h2><!--/$--></div></div></div></div></div>
<h2>h3</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><h3>The Joke Tax</h3><!--/$--></div></div></div></div></div>
<h2>h4</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><h4>People stopped telling jokes</h4><!--/$--></div></div></div></div></div>
<h2>p</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><p>The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.</p><!--/$--></div></div></div></div></div>
<h2>blockquote</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><blockquote>"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."</blockquote><!--/$--></div></div></div></div></div>
<h2>table</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><div><table><thead><tr><th>King's Treasury</th><th>People's happiness</th></tr></thead><tbody><tr><td>Empty</td><td>Overflowing</td></tr><tr><td>Modest</td><td>Satisfied</td></tr><tr><td>Full</td><td>Ecstatic</td></tr></tbody></table></div><!--/$--></div></div></div></div></div>
<h2>list</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><ul><li>1st level of puns: 5 gold coins</li><li>2nd level of jokes: 10 gold coins</li><li>3rd level of one-liners : 20 gold coins</li></ul><!--/$--></div></div></div></div></div>
<h2>Inline code</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><code>@radix-ui/react-alert-dialog</code><!--/$--></div></div></div></div></div>
<h2>Lead</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><p>A modal dialog that interrupts the user with important content and expects a response.</p><!--/$--></div></div></div></div></div>
<h2>Large</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><div>Are you absolutely sure?</div><!--/$--></div></div></div></div></div>
<h2>Small</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><small>Email address</small><!--/$--></div></div></div></div></div>
<h2>Muted</h2>
<div><div><div><div><button>Preview</button><button>Code</button></div></div><div><div><button><span>Style: </span></button><div><button><span>Copy</span></button></div></div><div><div><!--$--><p>Enter your email address.</p><!--/$--></div></div></div></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/dark-mode
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Dark Mode</div></div><div><h1>Dark Mode</h1><p><span>Adding dark mode to your site.</span></p></div></div><div><div><div><div><div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/figma
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Figma</div></div><div><h1>Figma</h1><p><span>Every component recreated in Figma. With customizable props, typography and icons.</span></p></div><div><div><p>The Figma UI Kit is open sourced by .</p>

<h2>Grab a copy</h2>
</div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/installation
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Installation</div></div><div><h1>Installation</h1><p><span>How to install dependencies and structure your app.</span></p></div><div><div><h2>Frameworks</h2>

<h2>TypeScript</h2>
<p>This project and the components are written in TypeScript. We recommend using TypeScript for your project as well.</p>
<p>However we provide a JavaScript version of the components as well. The JavaScript version is available via the .</p>
<p>To opt-out of TypeScript, you can use the <code>tsx</code> flag in your <code>components.json</code> file.</p>
<div><div>components.json</div><pre><code>{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "rsc": false,
  "tsx": false,
  "aliases": {
    "utils": "~/lib/utils",
    "components": "~/components"
  }
}</code></pre><button><span>Copy</span></button></div>
<p>To configure import aliases, you can use the following <code>jsconfig.json</code>:</p>
<div><div>jsconfig.json</div><pre><code>{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}</code></pre><button><span>Copy</span></button></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/installation/astro
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Astro</div></div><div><h1>Astro</h1><p><span>Install and configure Astro.</span></p></div><div><div><div><h3>Create project</h3><p>Start by creating a new Astro project:</p><div><pre><code>npm create astro@latest</code></pre><button><span>Copy</span></button></div><h3>Configure your Astro project</h3><p>You will be asked a few questions to configure your project:</p><div><pre><code>- Where should we create your new project? ./your-app-name
- How would you like to start your new project? Choose a template
- Do you plan to write TypeScript? Yes
- How strict should TypeScript be? Strict
- Install dependencies? Yes
- Initialize a new git repository? (optional) Yes/No</code></pre><button><span>Copy</span></button></div><h3>Add React to your project</h3><p>Install React using the Astro CLI:</p><div><pre><code>npx astro add react</code></pre><button><span>Copy</span></button></div><div><div><p>Answer <code>Yes</code> to all the question prompted by the CLI when installing React.</p></div></div><h3>Add Tailwind CSS to your project</h3><div><pre><code>npx astro add tailwind</code></pre><button><span>Copy</span></button></div><h3>Create a <code>styles/globals.css</code> file in the <code>src</code> folder.</h3><div><div>styles/globals.css</div><pre><code>@tailwind base;
@tailwind components;
@tailwind utilities;</code></pre><button><span>Copy</span></button></div><h3>Import the <code>globals.css</code> file</h3><p>Import the <code>styles/globals.css</code> file in the <code>src/pages/index.astro</code> file:</p><div><div>src/pages/index.astro</div><pre><code>---
import '@/styles/globals.css'
---</code></pre><button><span>Copy</span></button></div><h3>Update <code>astro.config.mjs</code> and set <code>applyBaseStyles</code> to <code>false</code></h3><p>To prevent serving the Tailwind base styles twice, we need to tell Astro not to apply the base styles, since we already include them in our own <code>globals.css</code> file. To do this, set the <code>applyBaseStyles</code> config option for the tailwind plugin in <code>astro.config.mjs</code> to <code>false</code>.</p><div><div>astro.config.mjs</div><pre><code>export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})</code></pre><button><span>Copy</span></button></div><h3>Edit tsconfig.json file</h3><p>Add the following code to the <code>tsconfig.json</code> file to resolve paths:</p><div><div>tsconfig.json</div><pre><code>{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}</code></pre><button><span>Copy</span></button></div><h3>Run the CLI</h3><p>Run the <code>shadcn</code> init command to setup your project:</p><div><pre><code>npx shadcn@latest init</code></pre><button><span>Copy</span></button></div><h3>That's it</h3><p>You can now start adding components to your project.</p><div><pre><code>npx shadcn@latest add button</code></pre><button><span>Copy</span></button></div><p>The command above will add the <code>Button</code> component to your project. You can then import it like this:</p><div><pre><code>---
import { Button } from "@/components/ui/button"
---

<html lang="en">
	<head>
		<title>Astro</title>
	</head>
	<body>
		<Button>Hello World</Button>
	</body>
</html></code></pre><button><span>Copy</span></button></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/installation/gatsby
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Gatsby</div></div><div><h1>Gatsby</h1><p><span>Install and configure Gatsby.</span></p></div><div><div><div><h3>Create project</h3><p>Start by creating a new Gatsby project using <code>create-gatsby</code>:</p><div><pre><code>npm init gatsby</code></pre><button><span>Copy</span></button></div><h3>Configure your Gatsby project to use TypeScript and Tailwind CSS</h3><p>You will be asked a few questions to configure your project:</p><div><pre><code>✔ What would you like to call your site?
· your-app-name
✔ What would you like to name the folder where your site will be created?
· your-app-name
✔ Will you be using JavaScript or TypeScript?
· TypeScript
✔ Will you be using a CMS?
· Choose whatever you want
✔ Would you like to install a styling system?
· Tailwind CSS
✔ Would you like to install additional features with other plugins?
· Choose whatever you want
✔ Shall we do this? (Y/n) · Yes</code></pre><button><span>Copy</span></button></div><h3>Edit tsconfig.json file</h3><p>Add the following code to the <code>tsconfig.json</code> file to resolve paths:</p><div><pre><code>{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}</code></pre><button><span>Copy</span></button></div><h3>Create gatsby-node.ts file</h3><p>Create a <code>gatsby-node.ts</code> file at the root of your project if it doesn’t already exist, and add the code below to the <code>gatsby-node</code> file so your app can resolve paths:</p><div><pre><code>import * as path from "path"

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
      },
    },
  })
}</code></pre><button><span>Copy</span></button></div><h3>Run the CLI</h3><p>Run the <code>shadcn-ui</code> init command to setup your project:</p><div><pre><code>npx shadcn@latest init</code></pre><button><span>Copy</span></button></div><h3>Configure components.json</h3><p>You will be asked a few questions to configure <code>components.json</code>:</p><div><pre><code>Would you like to use TypeScript (recommended)? no / yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › ./src/styles/globals.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no</code></pre><button><span>Copy</span></button></div><h3>That's it</h3><p>You can now start adding components to your project.</p><div><pre><code>npx shadcn@latest add button</code></pre><button><span>Copy</span></button></div><p>The command above will add the <code>Button</code> component to your project. You can then import it like this:</p><div><pre><code>import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}</code></pre><button><span>Copy</span></button></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/installation/laravel
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Laravel</div></div><div><h1>Laravel</h1><p><span>Install and configure Laravel with Inertia</span></p></div><div><div><div><h3>Create project</h3><p>Start by creating a new Laravel project with Inertia and React using the laravel installer <code>laravel new my-app</code>:</p><div><pre><code>laravel new my-app --typescript --breeze --stack=react --git --no-interaction</code></pre><button><span>Copy</span></button></div><h3>Run the CLI</h3><p>Run the <code>shadcn</code> init command to setup your project:</p><div><pre><code>npx shadcn@latest init</code></pre><button><span>Copy</span></button></div><h3>Configure components.json</h3><p>You will be asked a few questions to configure <code>components.json</code>:</p><div><pre><code>Which style would you like to use?
Which color would you like to use as base color?
Do you want to use CSS variables for colors? › yes</code></pre><button><span>Copy</span></button></div><h3>That's it</h3><p>You can now start adding components to your project.</p><div><pre><code>npx shadcn@latest add button</code></pre><button><span>Copy</span></button></div><p>The command above will add the <code>Button</code> component to your project. You can then import it like this:</p><div><pre><code>import { Button } from "@/Components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}</code></pre><button><span>Copy</span></button></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/installation/manual
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Manual Installation</div></div><div><h1>Manual Installation</h1><p><span>Add dependencies to your project manually.</span></p></div><div><div><div><h3>Add Tailwind CSS</h3><p>Components are styled using Tailwind CSS. You need to install Tailwind CSS in your project.</p><h3>Add dependencies</h3><p>Add the following dependencies to your project:</p><div><pre><code>npm install tailwindcss-animate class-variance-authority clsx tailwind-merge</code></pre><button><span>Copy</span></button></div><h3>Add icon library</h3><p>If you're using the <code>default</code> style, install <code>lucide-react</code>:</p><div><pre><code>npm install lucide-react</code></pre><button><span>Copy</span></button></div><p>If you're using the <code>new-york</code> style, install <code>@radix-ui/react-icons</code>:</p><div><pre><code>npm install @radix-ui/react-icons</code></pre><button><span>Copy</span></button></div><h3>Configure path aliases</h3><p>I use the <code>@</code> alias. This is how I configure it in tsconfig.json:</p><div><div>tsconfig.json</div><pre><code>{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}</code></pre><button><span>Copy</span></button></div><p>The <code>@</code> alias is a preference. You can use other aliases if you want.</p><p><strong>If you use a different alias such as ~, you'll need to update import statements when adding components.</strong></p><h3>Configure tailwind.config.js</h3><p>Here's what my <code>tailwind.config.js</code> file looks like:</p><div><div>tailwind.config.js</div><pre><code>const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}</code></pre><button><span>Copy</span></button></div><h3>Configure styles</h3><p>Add the following to your styles/globals.css file. You can learn more about using CSS variables for theming in the .</p><div><div>globals.css</div><pre><code>@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;

    --ring: 215 20.2% 65.1%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;

    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;

    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;

    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;

    --border: 216 34% 17%;
    --input: 216 34% 17%;

    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;

    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --ring: 216 34% 17%;

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}</code></pre><button><span>Copy</span></button></div><h3>Add a cn helper</h3><p>I use a <code>cn</code> helper to make it easier to conditionally add Tailwind CSS classes. Here's how I define it in <code>lib/utils.ts</code>:</p><div><div>lib/utils.ts</div><pre><code>import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}</code></pre><button><span>Copy</span></button></div><h3>That's it</h3><p>You can now start adding components to your project.</p></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/installation/next
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Next.js</div></div><div><h1>Next.js</h1><p><span>Install and configure Next.js.</span></p></div><div><div><div><h3>Create project</h3><p>Run the <code>init</code> command to create a new Next.js project or to setup an existing one:</p><div><pre><code>npx shadcn@latest init</code></pre><button><span>Copy</span></button></div><div><div><p>You can use the <code>-d</code> flag for defaults i.e <code>new-york</code>, <code>zinc</code> and <code>yes</code> for the css variables.</p><div><pre><code>npx shadcn@latest init -d</code></pre><button><span>Copy</span></button></div></div></div><h3>Configure components.json</h3><p>You will be asked a few questions to configure <code>components.json</code>:</p><div><pre><code>Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › no / yes</code></pre><button><span>Copy</span></button></div><h3>That's it</h3><p>You can now start adding components to your project.</p><div><pre><code>npx shadcn@latest add button</code></pre><button><span>Copy</span></button></div><p>The command above will add the <code>Button</code> component to your project. You can then import it like this:</p><div><pre><code>import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}</code></pre><button><span>Copy</span></button></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/installation/remix
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Remix</div></div><div><h1>Remix</h1><p><span>Install and configure Remix.</span></p></div><div><div><div><h3>Create project</h3><p>Start by creating a new Remix project using <code>create-remix</code>:</p><div><pre><code>npx create-remix@latest my-app</code></pre><button><span>Copy</span></button></div><h3>Run the CLI</h3><p>Run the <code>shadcn-ui</code> init command to setup your project:</p><div><pre><code>npx shadcn@latest init</code></pre><button><span>Copy</span></button></div><h3>Configure components.json</h3><p>You will be asked a few questions to configure <code>components.json</code>:</p><div><pre><code>Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › no / yes</code></pre><button><span>Copy</span></button></div><h3>App structure</h3><div><div><p><strong>Note</strong>: This app structure is only a suggestion. You can place the files wherever you want.</p></div></div><ul>
<li>Place the UI components in the <code>app/components/ui</code> folder.</li>
<li>Your own components can be placed in the <code>app/components</code> folder.</li>
<li>The <code>app/lib</code> folder contains all the utility functions. We have a <code>utils.ts</code> where we define the <code>cn</code> helper.</li>
<li>The <code>app/tailwind.css</code> file contains the global CSS.</li>
</ul><h3>Install Tailwind CSS</h3><div><pre><code>npm add -D tailwindcss@latest autoprefixer@latest</code></pre><button><span>Copy</span></button></div><p>Then we create a <code>postcss.config.js</code> file:</p><div><pre><code>export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}</code></pre><button><span>Copy</span></button></div><p>And finally we add the following to our <code>remix.config.js</code> file:</p><div><pre><code>/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ...
  tailwind: true,
  postcss: true,
  ...
};</code></pre><button><span>Copy</span></button></div><h3>Add <code>tailwind.css</code> to your app</h3><p>In your <code>app/root.tsx</code> file, import the <code>tailwind.css</code> file:</p><div><pre><code>import styles from "./tailwind.css"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]</code></pre><button><span>Copy</span></button></div><h3>That's it</h3><p>You can now start adding components to your project.</p><div><pre><code>npx shadcn@latest add button</code></pre><button><span>Copy</span></button></div><p>The command above will add the <code>Button</code> component to your project. You can then import it like this:</p><div><pre><code>import { Button } from "~/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}</code></pre><button><span>Copy</span></button></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/installation/vite
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Vite</div></div><div><h1>Vite</h1><p><span>Install and configure Vite.</span></p></div><div><div><div><h3>Create project</h3><p>Start by creating a new React project using <code>vite</code>:</p><div><pre><code>npm create vite@latest</code></pre><button><span>Copy</span></button></div><h3>Add Tailwind and its configuration</h3><p>Install <code>tailwindcss</code> and its peer dependencies, then generate your <code>tailwind.config.js</code> and <code>postcss.config.js</code> files:</p><div><pre><code>npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p</code></pre><button><span>Copy</span></button></div><h3>Edit tsconfig.json file</h3><p>The current version of Vite splits TypeScript configuration into three files, two of which need to be edited.
Add the <code>baseUrl</code> and <code>paths</code> properties to the <code>compilerOptions</code> section of the <code>tsconfig.json</code> and
<code>tsconfig.app.json</code> files:</p><div><pre><code>{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}</code></pre><button><span>Copy</span></button></div><h3>Edit tsconfig.app.json file</h3><p>Add the following code to the <code>tsconfig.app.json</code> file to resolve paths, for your IDE:</p><div><pre><code>{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}</code></pre><button><span>Copy</span></button></div><h3>Update vite.config.ts</h3><p>Add the following code to the vite.config.ts so your app can resolve paths without error</p><div><pre><code># (so you can import "path" without error)
npm i -D @types/node</code></pre><button><span>Copy</span></button></div><div><pre><code>import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})</code></pre><button><span>Copy</span></button></div><h3>Run the CLI</h3><p>Run the <code>shadcn-ui</code> init command to setup your project:</p><div><pre><code>npx shadcn@latest init</code></pre><button><span>Copy</span></button></div><h3>Configure components.json</h3><p>You will be asked a few questions to configure <code>components.json</code>:</p><div><pre><code>Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › no / yes</code></pre><button><span>Copy</span></button></div><h3>That's it</h3><p>You can now start adding components to your project.</p><div><pre><code>npx shadcn@latest add button</code></pre><button><span>Copy</span></button></div><p>The command above will add the <code>Button</code> component to your project. You can then import it like this:</p><div><pre><code>import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}</code></pre><button><span>Copy</span></button></div></div></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/theming
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Theming</div></div><div><h1>Theming</h1><p><span>Using CSS Variables or Tailwind CSS for theming.</span></p></div><div><div><p>You can choose between using CSS variables or Tailwind CSS utility classes for theming.</p>
<h2>Utility classes</h2>
<div><pre><code><div className="bg-zinc-950dark:bg-white" /></code></pre><button><span>Copy</span></button></div>
<p>To use utility classes for theming set <code>tailwind.cssVariables</code> to <code>false</code> in your <code>components.json</code> file.</p>
<div><div>components.json</div><pre><code>{
  "style": "default",
  "rsc": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": false
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}</code></pre><button><span>Copy</span></button></div>
<h2>CSS Variables</h2>
<div><pre><code><div className="bg-backgroundtext-foreground" /></code></pre><button><span>Copy</span></button></div>
<p>To use CSS variables for theming set <code>tailwind.cssVariables</code> to <code>true</code> in your <code>components.json</code> file.</p>
<div><div>components.json</div><pre><code>{
  "style": "default",
  "rsc": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}</code></pre><button><span>Copy</span></button></div>
<h3>Convention</h3>
<p>We use a simple <code>background</code> and <code>foreground</code> convention for colors. The <code>background</code> variable is used for the background color of the component and the <code>foreground</code> variable is used for the text color.</p>
<div><div><p>The <code>background</code> suffix is omitted when the variable is used for the background color of the component.</p></div></div>
<p>Given the following CSS variables:</p>
<div><pre><code>--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;</code></pre><button><span>Copy</span></button></div>
<p>The <code>background</code> color of the following component will be <code>hsl(var(--primary))</code> and the <code>foreground</code> color will be <code>hsl(var(--primary-foreground))</code>.</p>
<div><pre><code><div className="bg-primary text-primary-foreground">Hello</div></code></pre><button><span>Copy</span></button></div>
<div><div><p><strong>CSS variables must be defined without color space function</strong>. See the  for more information.</p></div></div>
<h3>List of variables</h3>
<p>Here's the list of variables available for customization:</p>
<div><div><div>Default background color of <body />...etc</div><pre><code>--background: 0 0% 100%;
--foreground: 222.2 47.4% 11.2%;</code></pre><button><span>Copy</span></button></div><div><div>Muted backgrounds such as <TabsList />, <Skeleton /> and <Switch /></div><pre><code>--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;</code></pre><button><span>Copy</span></button></div><div><div>Background color for <Card /></div><pre><code>--card: 0 0% 100%;
--card-foreground: 222.2 47.4% 11.2%;</code></pre><button><span>Copy</span></button></div><div><div>Background color for popovers such as <DropdownMenu />, <HoverCard />, <Popover /></div><pre><code>--popover: 0 0% 100%;
--popover-foreground: 222.2 47.4% 11.2%;</code></pre><button><span>Copy</span></button></div><div><div>Default border color</div><pre><code>--border: 214.3 31.8% 91.4%;</code></pre><button><span>Copy</span></button></div><div><div>Border color for inputs such as <Input />, <Select />, <Textarea /></div><pre><code>--input: 214.3 31.8% 91.4%;</code></pre><button><span>Copy</span></button></div><div><div>Primary colors for <Button /></div><pre><code>--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;</code></pre><button><span>Copy</span></button></div><div><div>Secondary colors for <Button /></div><pre><code>--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;</code></pre><button><span>Copy</span></button></div><div><div>Used for accents such as hover effects on <DropdownMenuItem>, <SelectItem>...etc</div><pre><code>--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;</code></pre><button><span>Copy</span></button></div><div><div>Used for destructive actions such as <Button variant="destructive"></div><pre><code>--destructive: 0 100% 50%;
--destructive-foreground: 210 40% 98%;</code></pre><button><span>Copy</span></button></div><div><div>Used for focus ring</div><pre><code>--ring: 215 20.2% 65.1%;</code></pre><button><span>Copy</span></button></div><div><div>Border radius for card, input and buttons</div><pre><code>--radius: 0.5rem;</code></pre><button><span>Copy</span></button></div></div>
<h3>Adding new colors</h3>
<p>To add new colors, you need to add them to your CSS file and to your <code>tailwind.config.js</code> file.</p>
<div><div>app/globals.css</div><pre><code>:root {
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 89%;
}

.dark {
  --warning: 48 96% 89%;
  --warning-foreground: 38 92% 50%;
}</code></pre><button><span>Copy</span></button></div>
<div><div>tailwind.config.js</div><pre><code>module.exports = {
  theme: {
    extend: {
      colors: {
        warning: "hsl(var(--warning))",
        "warning-foreground": "hsl(var(--warning-foreground))",
      },
    },
  },
}</code></pre><button><span>Copy</span></button></div>
<p>You can now use the <code>warning</code> utility class in your components.</p>
<div><pre><code><div className="bg-warningtext-warning-foreground" /></code></pre><button><span>Copy</span></button></div>
<h3>Other color formats</h3>
<p>I recommend using  for theming but you can also use other color formats if you prefer.</p>
<p>See the  for more information on using <code>rgb</code>, <code>rgba</code> or <code>hsl</code> colors.</p></div></div></div><div><div><div><div><div><div><p>On This Page</p></div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
                
            Source: 
                https://ui.shadcn.com/docs/v0
  
            HTML Content:
            <div><div><header><div><button><span>Toggle Menu</span></button><div><div><button><span>Search documentation...</span><span>Search...</span><kbd><span>⌘</span>K</kbd></button></div><nav><button><span>Toggle theme</span></button></nav></div></div></header><main><div><div><aside><div><div><div><div><div><h4>Getting Started</h4></div><div><h4>Installation</h4></div><div><h4>Components</h4></div></div></div></div></div></aside><main><div><div><div>Docs</div><div>Open in v0</div></div><div><h1>Open in v0</h1><p><span>Open components in v0 for customization.</span></p></div><div><div><p>Every component on ui.shadcn.com is editable on . This allows you to easily customize the components in natural language and paste into your app.</p>

<p>To use v0, sign-up for a free . In addition to v0, this gives you free access to Vercel's frontend cloud platform by the creators of Next.js, where you can deploy and host your project for free.</p>
<p>Learn more about getting started with .</p>
<p>Learn more about getting started with .</p></div></div></div><div><div><div><div><div><div><div>Bring your app built with shadcn to life on Vercel</div><div>Trusted by OpenAI, Sonos, Chick-fil-A, and more.</div><div>Vercel provides tools and infrastructure to deploy apps and features at scale.</div><button>Deploy Now</button></div></div></div></div></div></div></main></div></div></main><footer><div><p>Built by<!-- --> . The source code is available on<!-- --> .</p></div></footer></div></div>
`