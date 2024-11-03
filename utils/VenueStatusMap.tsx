export const venueStatus = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Suspended",
    value: "suspended",
  },
];

export const getVenueStatusMap = (value: string) => {
  return venueStatus.find((item) => item.value === value);
};
