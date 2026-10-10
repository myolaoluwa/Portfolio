export type StudioMember = {
  id: string;
  name: string;
  role: string;
  verified: boolean;
  publication: "draft" | "approved";
};

// Only approved public information belongs here, including draft entries.
// Store private identity checks and publication consent outside the repository.
export const studioMembers: StudioMember[] = [
  {
    id: "olaoluwa",
    name: "Olaoluwa Moshood",
    role: "CEO, DelighTech",
    verified: true,
    publication: "approved",
  },
];

export function getPublishedTeam(records: readonly StudioMember[] = studioMembers) {
  return records.filter((member) =>
    member.verified && member.publication === "approved" &&
    [member.id, member.name, member.role].every((value) => value.trim().length > 0),
  );
}
