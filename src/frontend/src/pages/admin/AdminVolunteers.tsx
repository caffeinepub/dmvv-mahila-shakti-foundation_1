import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

export default function AdminVolunteers() {
  const { volunteerActivities, updateVolunteerActivity } = useApp();

  const statusColor = (s: string) => {
    if (s === "active") return "bg-green-100 text-green-700";
    if (s === "inactive") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Volunteer Registrations
      </h1>
      {volunteerActivities.length === 0 ? (
        <div
          className="text-center py-16 text-gray-400"
          data-ocid="admin_volunteers.empty_state"
        >
          Koi volunteer registration nahi hai.
        </div>
      ) : (
        <div className="space-y-3">
          {volunteerActivities.map((v, i) => (
            <Card key={v.id} data-ocid={`admin_volunteers.item.${i + 1}`}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-3">
                  <div>
                    <div className="font-bold text-gray-800">{v.userName}</div>
                    <div className="text-sm text-gray-600">
                      {v.userMobile} | Joined: {v.joinedAt}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Area:</span> {v.area} |
                      <span className="text-gray-400 ml-1">Hrs/Week:</span>{" "}
                      {v.hoursPerWeek}
                    </div>
                    {v.availability && (
                      <div className="text-xs text-gray-400">
                        Availability: {v.availability}
                      </div>
                    )}
                    {v.description && (
                      <div className="text-xs text-gray-500 mt-1">
                        {v.description}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 items-start">
                    <Badge className={`capitalize ${statusColor(v.status)}`}>
                      {v.status}
                    </Badge>
                    {v.status !== "active" && (
                      <Button
                        size="sm"
                        className="bg-green-600 text-white"
                        onClick={() => {
                          updateVolunteerActivity(v.id, { status: "active" });
                          toast.success("Approved!");
                        }}
                        data-ocid={`admin_volunteers.confirm_button.${i + 1}`}
                      >
                        Approve
                      </Button>
                    )}
                    {v.status === "active" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          updateVolunteerActivity(v.id, { status: "inactive" });
                          toast.success("Deactivated.");
                        }}
                        data-ocid={`admin_volunteers.delete_button.${i + 1}`}
                      >
                        Deactivate
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
