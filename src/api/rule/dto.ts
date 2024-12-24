export type RulePost = {
  change: number;
  directory: number;
  file_url: string;
  hash: string;
  height: number;
  id: number;
  image: string;
  owner: string;
  parent_id: number;
  preview_url: string;
  rating: string;
  sample: number;
  sample_height: number;
  sample_url: string;
  sample_width: number;
  score: number;
  tags: string;
  width: number;
};

export type GetRulePostsQueryParams = {
  tags?: string[];
};
