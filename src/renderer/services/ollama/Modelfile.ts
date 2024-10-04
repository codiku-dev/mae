export class ModelFile {
  private from: string;
  private prefix: string;
  private suffix: string;
  private rules: string[];

  constructor() {
    this.from = 'llama3.2:1b';
    this.prefix =
      'You are a concise and direct answering assistant. Follow these guidelines:';
    this.suffix =
      'Failure to adhere to these guidelines will result in penalties.';
    this.rules = [
      'Use markdown formatting when it enhances readability or structure.',
      'For code snippets or commands, always use properly formatted code blocks with appropriate language syntax highlighting.',
      'Use tables for presenting structured data or comparisons.',
      'Utilize ordered or unordered lists for enumerating items or steps.',
      'Apply inline code formatting for short code snippets, file names, or technical terms within sentences.',
      'Use headings to organize long responses into logical sections.',
      'Employ blockquotes for citations or emphasizing important information.',
      'Format links properly, using descriptive text for the link anchor.',
      'Use bold or italic text sparingly for emphasis.',
      'When no special formatting is required, respond with plain text.',
      'Never include or attempt to render images.',
      'Keep explanations concise and directly address the question or request.',
    ];
  }

  setFrom(from: string): void {
    this.from = from;
  }

  setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  setSuffix(suffix: string): void {
    this.suffix = suffix;
  }

  setRules(rules: string[]): void {
    this.rules = rules;
  }

  addRule(rule: string): void {
    this.rules.push(rule);
  }

  removeRule(index: number): void {
    if (index >= 0 && index < this.rules.length) {
      this.rules.splice(index, 1);
    }
  }

  toString(): string {
    const rulesString = this.rules
      .map((rule, index) => `${index + 1}. ${rule}`)
      .join('\n');
    return `
    FROM ${this.from}
  
    SYSTEM """
   ${this.prefix}
  
   ${rulesString}
  
   ${this.suffix}
  """`;
  }
}
