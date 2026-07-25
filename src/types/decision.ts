export type RiskLevel = "Low" | "Medium" | "High";

export type RelationshipType = "supports" | "depends" | "blocks" | "alternative";

export type EdgeRelationshipData = {
  relationship: RelationshipType;
  [key: string]: unknown;
};

export type Decision = {
  id: string;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  risk: RiskLevel;
  confidence: number;
  cost: string;
  color: string;
  notes: string;
  position: {
    x: number;
    y: number;
  };
};

export type DecisionTemplateNode = {
  title: string;
  description?: string;
  risk: RiskLevel;
  confidence: number;
  cost: string;
  color: string;
  offset: { x: number; y: number };
};

export type DecisionTemplate = {
  id: string;
  name: string;
  description: string;
  nodes: DecisionTemplateNode[];
  connections: [number, number][];
};
