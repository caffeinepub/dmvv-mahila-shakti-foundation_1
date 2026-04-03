import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type User, useApp } from "@/context/AppContext";
import {
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  RefreshCw,
  UserCircle2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function generateAccessCode(): string {
  const digits = Math.floor(Math.random() * 900 + 100).toString();
  return `DMV${digits}`;
}

export default function AdminLoginManagement() {
  const { users, updateUser } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [revealedCodes, setRevealedCodes] = useState<Record<string, boolean>>(
    {},
  );
  const [changeCodeUser, setChangeCodeUser] = useState<User | null>(null);
  const [newCode, setNewCode] = useState("");

  const filtered = users
    .filter((u) => u.role !== "admin")
    .filter((u) => {
      const q = search.toLowerCase();
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      );
    })
    .filter((u) => {
      if (filterTab === "active") return u.isLoginActive !== false;
      if (filterTab === "inactive") return u.isLoginActive === false;
      return true;
    });

  const toggleReveal = (id: string) => {
    setRevealedCodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Access code copied!");
  };

  const handleToggleLogin = (user: User) => {
    const newStatus = user.isLoginActive === false;
    updateUser(user.id, { isLoginActive: newStatus });
    toast.success(
      `${user.fullName}'s login ${newStatus ? "activated" : "deactivated"}.`,
    );
  };

  const openChangeCode = (user: User) => {
    setChangeCodeUser(user);
    setNewCode(user.accessCode || "");
  };

  const handleSaveCode = () => {
    if (!changeCodeUser) return;
    if (!newCode.trim()) {
      toast.error("Access code cannot be empty.");
      return;
    }
    updateUser(changeCodeUser.id, { accessCode: newCode.trim().toUpperCase() });
    toast.success(`Access code updated for ${changeCodeUser.fullName}.`);
    setChangeCodeUser(null);
    setNewCode("");
  };

  const handleAutoGenerate = () => {
    setNewCode(generateAccessCode());
  };

  const roleColors: Record<string, string> = {
    user: "bg-blue-100 text-blue-700",
    center: "bg-purple-100 text-purple-700",
    supervisor: "bg-orange-100 text-orange-700",
    transport: "bg-teal-100 text-teal-700",
    hr: "bg-pink-100 text-pink-700",
    admin: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <KeyRound size={22} className="text-green-700" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Login &amp; Access Code Management
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage member login status and access codes
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <Input
          placeholder="Search by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
          data-ocid="login_mgmt.search_input"
        />
        <Tabs value={filterTab} onValueChange={setFilterTab}>
          <TabsList>
            <TabsTrigger value="all" data-ocid="login_mgmt.tab">
              All ({users.filter((u) => u.role !== "admin").length})
            </TabsTrigger>
            <TabsTrigger value="active" data-ocid="login_mgmt.tab">
              Active (
              {
                users.filter(
                  (u) => u.role !== "admin" && u.isLoginActive !== false,
                ).length
              }
              )
            </TabsTrigger>
            <TabsTrigger value="inactive" data-ocid="login_mgmt.tab">
              Inactive (
              {
                users.filter(
                  (u) => u.role !== "admin" && u.isLoginActive === false,
                ).length
              }
              )
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {filtered.length === 0 ? (
            <div
              className="text-center py-12 text-gray-400"
              data-ocid="login_mgmt.empty_state"
            >
              No users found.
            </div>
          ) : (
            <Table data-ocid="login_mgmt.table">
              <TableHeader>
                <TableRow>
                  <TableHead>Member ID</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Login ID (Email)</TableHead>
                  <TableHead>Access Code</TableHead>
                  <TableHead>Login Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user, idx) => {
                  const isActive = user.isLoginActive !== false;
                  const code = user.accessCode || "—";
                  const revealed = revealedCodes[user.id] || false;

                  return (
                    <TableRow
                      key={user.id}
                      data-ocid={`login_mgmt.item.${idx + 1}`}
                    >
                      {/* Member ID */}
                      <TableCell className="text-xs text-gray-500 font-mono">
                        {user.memberId ||
                          `DMVV/2025/${String(idx + 1).padStart(3, "0")}`}
                      </TableCell>

                      {/* Member Name */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-green-700 text-xs font-bold">
                              {user.fullName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {user.fullName}
                            </div>
                            <div className="text-xs text-gray-400">
                              {user.mobile}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Role */}
                      <TableCell>
                        <Badge
                          className={`capitalize text-xs ${roleColors[user.role] || "bg-gray-100 text-gray-700"}`}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>

                      {/* Login ID */}
                      <TableCell className="text-sm font-mono text-gray-700">
                        {user.email}
                      </TableCell>

                      {/* Access Code */}
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-sm text-gray-800">
                            {user.accessCode ? (
                              revealed ? (
                                code
                              ) : (
                                "••••••"
                              )
                            ) : (
                              <span className="text-gray-400 italic text-xs">
                                Not set
                              </span>
                            )}
                          </span>
                          {user.accessCode && (
                            <>
                              <button
                                type="button"
                                onClick={() => toggleReveal(user.id)}
                                className="text-gray-400 hover:text-gray-700"
                                title={revealed ? "Hide" : "Show"}
                              >
                                {revealed ? (
                                  <EyeOff size={13} />
                                ) : (
                                  <Eye size={13} />
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleCopyCode(code)}
                                className="text-gray-400 hover:text-green-600"
                                title="Copy code"
                                data-ocid="login_mgmt.button"
                              >
                                <Copy size={13} />
                              </button>
                            </>
                          )}
                        </div>
                      </TableCell>

                      {/* Login Status */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={isActive}
                            onCheckedChange={() => handleToggleLogin(user)}
                            className={
                              isActive
                                ? "data-[state=checked]:bg-green-600"
                                : ""
                            }
                            data-ocid="login_mgmt.switch"
                          />
                          <span
                            className={`text-xs font-semibold flex items-center gap-1 ${
                              isActive ? "text-green-600" : "text-red-500"
                            }`}
                          >
                            {isActive ? (
                              <>
                                <CheckCircle2 size={12} /> Active
                              </>
                            ) : (
                              <>
                                <XCircle size={12} /> Inactive
                              </>
                            )}
                          </span>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs border-green-400 text-green-700 hover:bg-green-50"
                            onClick={() => openChangeCode(user)}
                            data-ocid="login_mgmt.edit_button"
                          >
                            <KeyRound size={12} className="mr-1" />
                            Change Code
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs"
                            onClick={() =>
                              navigate(`/admin/user-profile/${user.id}`)
                            }
                            data-ocid="login_mgmt.button"
                          >
                            <UserCircle2 size={12} className="mr-1" />
                            View Profile
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Change Code Dialog */}
      <Dialog
        open={!!changeCodeUser}
        onOpenChange={(open) => !open && setChangeCodeUser(null)}
      >
        <DialogContent className="max-w-sm" data-ocid="login_mgmt.dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KeyRound size={18} className="text-green-600" />
              Change Access Code
            </DialogTitle>
          </DialogHeader>
          {changeCodeUser && (
            <div className="space-y-4 py-2">
              <p className="text-sm text-gray-600">
                Member:{" "}
                <strong className="text-gray-900">
                  {changeCodeUser.fullName}
                </strong>
              </p>
              <div>
                <Label>New Access Code</Label>
                <Input
                  className="mt-1 font-mono uppercase"
                  placeholder="e.g. DMV001"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  maxLength={8}
                  data-ocid="login_mgmt.input"
                />
                <p className="text-xs text-gray-400 mt-1">
                  6–8 alphanumeric characters recommended.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full border-dashed border-green-400 text-green-700 hover:bg-green-50"
                onClick={handleAutoGenerate}
                data-ocid="login_mgmt.secondary_button"
              >
                <RefreshCw size={14} className="mr-2" />
                Auto Generate Code
              </Button>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setChangeCodeUser(null)}
              data-ocid="login_mgmt.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSaveCode}
              data-ocid="login_mgmt.save_button"
            >
              Save Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
