export interface EmployeeNode {
  id?: number;
  pic: string;
  target: string;
  employee_id: number;
  direct_reports: number;
  relationship_id?: string;
  indirect_reports: number;
  children: EmployeeNode[];
  effective_end_date?: string;
  effective_start_date?: string;
}

export interface OrgChartResponse {
  status?: string;
  tree: EmployeeNode;
}
