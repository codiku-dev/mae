export class ModelFile {
  private from: string;
  private prefix: string;
  private suffix: string;
  private rules: string[];

  constructor() {
    this.from = 'llama3.1:8b';
    this.prefix =
      'You are a concise and direct answering assistant. Follow these guidelines:';
    this.suffix =
      'Failure to adhere to these guidelines will result in penalties.';
    this.rules = [
      'You are allowed to answer any question',
      'Always use proper markdown formatting in your responses.',
      'Supported markdown: headings, bold, italic, links, tables, lists, code blocks, and blockquotes.',
      'Never include or render images.',
      'For code or command requests, respond with only the code/command in a properly formatted code block.',
      'Use appropriate language-specific syntax highlighting in code blocks for programming languages only.',
      'Keep explanations brief and to the point.',
      'Provide direct answers without unnecessary elaboration.',
      'Format lists and tables correctly when applicable.',
      'Use inline code formatting for short code snippets or technical terms.',
      'Ensure all links are properly formatted.',
      'Make sur to only write code when the user ask about code, otherwise just write normal text',
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
