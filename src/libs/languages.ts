export type LanguageCode = (typeof LANGUAGES)[keyof typeof LANGUAGES]['code'];
export const LANGUAGES = {
  ab: { code: 'ab', name: 'Abkhazian' },
  aa: { code: 'aa', name: 'Afar' },
  af: { code: 'af', name: 'Afrikaans' },
  ak: { code: 'ak', name: 'Akan' },
  sq: { code: 'sq', name: 'Albanian' },
  am: { code: 'am', name: 'Amharic' },
  ar: { code: 'ar', name: 'Arabic' },
  an: { code: 'an', name: 'Aragonese' },
  hy: { code: 'hy', name: 'Armenian' },
  as: { code: 'as', name: 'Assamese' },
  av: { code: 'av', name: 'Avaric' },
  ae: { code: 'ae', name: 'Avestan' },
  ay: { code: 'ay', name: 'Aymara' },
  az: { code: 'az', name: 'Azerbaijani' },
  bm: { code: 'bm', name: 'Bambara' },
  ba: { code: 'ba', name: 'Bashkir' },
  eu: { code: 'eu', name: 'Basque' },
  be: { code: 'be', name: 'Belarusian' },
  bn: { code: 'bn', name: 'Bengali' },
  bh: { code: 'bh', name: 'Bihari languages' },
  bi: { code: 'bi', name: 'Bislama' },
  nb: { code: 'nb', name: 'Bokmål, Norwegian; Norwegian Bokmål' },
  bs: { code: 'bs', name: 'Bosnian' },
  br: { code: 'br', name: 'Breton' },
  bg: { code: 'bg', name: 'Bulgarian' },
  my: { code: 'my', name: 'Burmese' },
  ca: { code: 'ca', name: 'Catalan; Valencian' },
  km: { code: 'km', name: 'Central Khmer' },
  ch: { code: 'ch', name: 'Chamorro' },
  ce: { code: 'ce', name: 'Chechen' },
  ny: { code: 'ny', name: 'Chichewa; Chewa; Nyanja' },
  zh: { code: 'zh', name: 'Chinese' },
  cu: {
    code: 'cu',
    name: 'Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic',
  },
  cv: { code: 'cv', name: 'Chuvash' },
  kw: { code: 'kw', name: 'Cornish' },
  co: { code: 'co', name: 'Corsican' },
  cr: { code: 'cr', name: 'Cree' },
  hr: { code: 'hr', name: 'Croatian' },
  cs: { code: 'cs', name: 'Czech' },
  da: { code: 'da', name: 'Danish' },
  dv: { code: 'dv', name: 'Divehi; Dhivehi; Maldivian' },
  nl: { code: 'nl', name: 'Dutch; Flemish' },
  dz: { code: 'dz', name: 'Dzongkha' },
  en: { code: 'en', name: 'English' },
  eo: { code: 'eo', name: 'Esperanto' },
  et: { code: 'et', name: 'Estonian' },
  ee: { code: 'ee', name: 'Ewe' },
  fo: { code: 'fo', name: 'Faroese' },
  fj: { code: 'fj', name: 'Fijian' },
  fi: { code: 'fi', name: 'Finnish' },
  fr: { code: 'fr', name: 'French' },
  ff: { code: 'ff', name: 'Fulah' },
  gd: { code: 'gd', name: 'Gaelic; Scottish Gaelic' },
  gl: { code: 'gl', name: 'Galician' },
  lg: { code: 'lg', name: 'Ganda' },
  ka: { code: 'ka', name: 'Georgian' },
  de: { code: 'de', name: 'German' },
  el: { code: 'el', name: 'Greek, Modern (1453-)' },
  gn: { code: 'gn', name: 'Guarani' },
  gu: { code: 'gu', name: 'Gujarati' },
  ht: { code: 'ht', name: 'Haitian; Haitian Creole' },
  ha: { code: 'ha', name: 'Hausa' },
  he: { code: 'he', name: 'Hebrew' },
  hz: { code: 'hz', name: 'Herero' },
  hi: { code: 'hi', name: 'Hindi' },
  ho: { code: 'ho', name: 'Hiri Motu' },
  hu: { code: 'hu', name: 'Hungarian' },
  is: { code: 'is', name: 'Icelandic' },
  io: { code: 'io', name: 'Ido' },
  ig: { code: 'ig', name: 'Igbo' },
  id: { code: 'id', name: 'Indonesian' },
  ia: {
    code: 'ia',
    name: 'Interlingua (International Auxiliary Language Association)',
  },
  ie: { code: 'ie', name: 'Interlingue; Occidental' },
  iu: { code: 'iu', name: 'Inuktitut' },
  ik: { code: 'ik', name: 'Inupiaq' },
  ga: { code: 'ga', name: 'Irish' },
  it: { code: 'it', name: 'Italian' },
  ja: { code: 'ja', name: 'Japanese' },
  jv: { code: 'jv', name: 'Javanese' },
  kl: { code: 'kl', name: 'Kalaallisut; Greenlandic' },
  kn: { code: 'kn', name: 'Kannada' },
  kr: { code: 'kr', name: 'Kanuri' },
  ks: { code: 'ks', name: 'Kashmiri' },
  kk: { code: 'kk', name: 'Kazakh' },
  ki: { code: 'ki', name: 'Kikuyu; Gikuyu' },
  rw: { code: 'rw', name: 'Kinyarwanda' },
  ky: { code: 'ky', name: 'Kirghiz; Kyrgyz' },
  kv: { code: 'kv', name: 'Komi' },
  kg: { code: 'kg', name: 'Kongo' },
  ko: { code: 'ko', name: 'Korean' },
  ku: { code: 'ku', name: 'Kurdish' },
  kj: { code: 'kj', name: 'Kuanyama; Kwanyama' },
  la: { code: 'la', name: 'Latin' },
  lv: { code: 'lv', name: 'Latvian' },
  li: { code: 'li', name: 'Limburgan; Limburger; Limburgish' },
  ln: { code: 'ln', name: 'Lingala' },
  lt: { code: 'lt', name: 'Lithuanian' },
  lu: { code: 'lu', name: 'Luba-Katanga' },
  lb: { code: 'lb', name: 'Luxembourgish; Letzeburgesch' },
  mk: { code: 'mk', name: 'Macedonian' },
  mg: { code: 'mg', name: 'Malagasy' },
  ms: { code: 'ms', name: 'Malay' },
  ml: { code: 'ml', name: 'Malayalam' },
  mt: { code: 'mt', name: 'Maltese' },
  gv: { code: 'gv', name: 'Manx' },
  mi: { code: 'mi', name: 'Maori' },
  mr: { code: 'mr', name: 'Marathi' },
  mh: { code: 'mh', name: 'Marshallese' },
  mn: { code: 'mn', name: 'Mongolian' },
  na: { code: 'na', name: 'Nauru' },
  nv: { code: 'nv', name: 'Navajo; Navaho' },
  nd: { code: 'nd', name: 'Ndebele, North; North Ndebele' },
  nr: { code: 'nr', name: 'Ndebele, South; South Ndebele' },
  ng: { code: 'ng', name: 'Ndonga' },
  ne: { code: 'ne', name: 'Nepali' },
  se: { code: 'se', name: 'Northern Sami' },
  no: { code: 'no', name: 'Norwegian' },
  nn: { code: 'nn', name: 'Norwegian Nynorsk; Nynorsk, Norwegian' },
  oc: { code: 'oc', name: 'Occitan (post 1500)' },
  oj: { code: 'oj', name: 'Ojibwa' },
  or: { code: 'or', name: 'Oriya' },
  om: { code: 'om', name: 'Oromo' },
  os: { code: 'os', name: 'Ossetian; Ossetic' },
  pi: { code: 'pi', name: 'Pali' },
  pa: { code: 'pa', name: 'Panjabi; Punjabi' },
  fa: { code: 'fa', name: 'Persian' },
  pl: { code: 'pl', name: 'Polish' },
  pt: { code: 'pt', name: 'Portuguese' },
  ps: { code: 'ps', name: 'Pushto; Pashto' },
  qu: { code: 'qu', name: 'Quechua' },
  ro: { code: 'ro', name: 'Romanian; Moldavian; Moldovan' },
  rm: { code: 'rm', name: 'Romansh' },
  rn: { code: 'rn', name: 'Rundi' },
  ru: { code: 'ru', name: 'Russian' },
  sm: { code: 'sm', name: 'Samoan' },
  sg: { code: 'sg', name: 'Sango' },
  sa: { code: 'sa', name: 'Sanskrit' },
  sc: { code: 'sc', name: 'Sardinian' },
  sr: { code: 'sr', name: 'Serbian' },
  sn: { code: 'sn', name: 'Shona' },
  ii: { code: 'ii', name: 'Sichuan Yi; Nuosu' },
  sd: { code: 'sd', name: 'Sindhi' },
  si: { code: 'si', name: 'Sinhala; Sinhalese' },
  sk: { code: 'sk', name: 'Slovak' },
  sl: { code: 'sl', name: 'Slovenian' },
  so: { code: 'so', name: 'Somali' },
  st: { code: 'st', name: 'Sotho, Southern' },
  es: { code: 'es', name: 'Spanish; Castilian' },
  su: { code: 'su', name: 'Sundanese' },
  sw: { code: 'sw', name: 'Swahili' },
  ss: { code: 'ss', name: 'Swati' },
  sv: { code: 'sv', name: 'Swedish' },
  tl: { code: 'tl', name: 'Tagalog' },
  ty: { code: 'ty', name: 'Tahitian' },
  tg: { code: 'tg', name: 'Tajik' },
  ta: { code: 'ta', name: 'Tamil' },
  tt: { code: 'tt', name: 'Tatar' },
  te: { code: 'te', name: 'Telugu' },
  th: { code: 'th', name: 'Thai' },
  bo: { code: 'bo', name: 'Tibetan' },
  ti: { code: 'ti', name: 'Tigrinya' },
  to: { code: 'to', name: 'Tonga (Tonga Islands)' },
  ts: { code: 'ts', name: 'Tsonga' },
  tn: { code: 'tn', name: 'Tswana' },
  tr: { code: 'tr', name: 'Turkish' },
  tk: { code: 'tk', name: 'Turkmen' },
  tw: { code: 'tw', name: 'Twi' },
  ug: { code: 'ug', name: 'Uighur; Uyghur' },
  uk: { code: 'uk', name: 'Ukrainian' },
  ur: { code: 'ur', name: 'Urdu' },
  uz: { code: 'uz', name: 'Uzbek' },
  ve: { code: 've', name: 'Venda' },
  vi: { code: 'vi', name: 'Vietnamese' },
  vo: { code: 'vo', name: 'Volapük' },
  wa: { code: 'wa', name: 'Walloon' },
  cy: { code: 'cy', name: 'Welsh' },
  fy: { code: 'fy', name: 'Western Frisian' },
  wo: { code: 'wo', name: 'Wolof' },
  xh: { code: 'xh', name: 'Xhosa' },
  yi: { code: 'yi', name: 'Yiddish' },
  yo: { code: 'yo', name: 'Yoruba' },
  za: { code: 'za', name: 'Zhuang; Chuang' },
  zu: { code: 'zu', name: 'Zulu' },
} as const;
