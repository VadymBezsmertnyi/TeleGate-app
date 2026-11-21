export interface TemplateData {
  id: string;
  title: string;
  description: string;
  defaultMessage: string;
  currentMessage: string;
  variables: string[];
}

export interface TemplateAction {
  type: "save" | "reset" | "saveAll" | "discard";
  templateId?: string;
}
