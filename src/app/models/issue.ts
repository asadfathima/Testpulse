export class Issue {
    component: string;
    creation_date: string;
    debt: string;
    effort: string;
    id: number;
    issue_key: string;
    issue_timestamp: string;
    line: number;
    message: string;
    project: string;
    rule: string;
    severity: string;
    status: string;
    tags: string;
    type: string;
    update_date: string;

    constructor(data?: any) {
        this.component = data?.component || '';
        this.creation_date = data?.creation_date || '';
        this.debt = data?.debt || '';
        this.effort = data?.effort || '';
        this.id = data?.id || 0;
        this.issue_key = data?.issue_key || '';
        this.issue_timestamp = data?.issue_timestamp || '';
        this.line = data?.line || 0;
        this.message = data?.message || '';
        this.project = data?.project || '';
        this.rule = data?.rule || '';
        this.severity = data?.severity || '';
        this.status = data?.status || '';
        this.tags = data?.tags || '';
        this.type = data?.type || '';
        this.update_date = data?.update_date || '';
    }
}
