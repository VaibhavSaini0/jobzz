"use client";

interface Teammate {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface RecruitingTeamTabProps {
  ownerId: string | undefined;
  employers: Teammate[] | null | undefined;
}

export default function RecruitingTeamTab({
  ownerId,
  employers,
}: RecruitingTeamTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground border-b border-card-border/50 pb-2">
        Recruiter Workspace Teammates
      </h3>

      <div className="space-y-4">
        {/* Primary Administrator Teammate card */}
        <div className="p-4 border border-card-border/60 bg-indigo-soft/5 hover:border-indigo-500/20 transition duration-300 rounded-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white font-extrabold rounded-full shrink-0 shadow-sm">
                A
              </div>
              <div>
                <span className="text-sm font-bold text-foreground block">
                  Primary Corporate Admin
                </span>
                <span className="text-xs text-text-muted block mt-0.5">
                  ID: {ownerId}
                </span>
              </div>
            </div>
            <span className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
              Workspace Owner
            </span>
          </div>
        </div>

        {/* Associated recruiters */}
        {employers && employers.length > 0 ? (
          employers.map((employer) => (
            <div
              key={employer.id}
              className="p-4 border border-card-border/60 bg-card-bg/40 hover:border-indigo-500/20 transition duration-300 rounded-2xl"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 flex items-center justify-center bg-indigo-soft/10 text-indigo-500 font-extrabold rounded-full shrink-0">
                    {employer.name[0].toUpperCase()}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-foreground block">
                      {employer.name}
                    </span>
                    <span className="text-xs text-text-muted block mt-0.5">
                      {employer.email}
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-card-border/50 dark:bg-card-border/30 px-3 py-1 text-xs font-bold text-text-muted">
                  Employer Teammate
                </span>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
}
