export type Model = {
  id: string;
  name: string;
  isActive: boolean;
  label: string;
  isInstalled: boolean;
  size: string;
};

export type OllamaModel = {
  name: string;
  model: string;
  size: number;
  digest: string;
  details: {
    parent_model: string;
    format: string;
    family: string;
    families: string[];
    parameter_size: string;
    quantization_level: string;
  };
  expires_at: string;
  size_vram: number;
};
