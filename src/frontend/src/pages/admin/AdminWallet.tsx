import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type WalletTransaction, useApp } from "@/context/AppContext";
import { IndianRupee, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminWallet() {
  const { users, walletTransactions, addWalletTransaction } = useApp();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"credit" | "debit">("credit");

  const regularUsers = users.filter(
    (u) => u.status === "approved" && u.role === "user",
  );

  const handleCredit = () => {
    if (!selectedUserId || !amount || !description) {
      toast.error("User, amount aur description required hai.");
      return;
    }
    const userTxns = walletTransactions.filter(
      (t) => t.userId === selectedUserId,
    );
    const currentBalance = userTxns.reduce(
      (s, t) => s + (t.type === "credit" ? t.amount : -t.amount),
      0,
    );
    const newBalance =
      type === "credit"
        ? currentBalance + Number(amount)
        : currentBalance - Number(amount);

    const txn: WalletTransaction = {
      id: `txn_${Date.now()}`,
      userId: selectedUserId,
      type,
      amount: Number(amount),
      description,
      date: new Date().toISOString().split("T")[0],
      balance: newBalance,
    };
    addWalletTransaction(txn);
    toast.success(
      `Wallet ${type === "credit" ? "credited" : "debited"}: ₹${amount}`,
    );
    setAmount("");
    setDescription("");
  };

  const totalStats = {
    totalCredit: walletTransactions
      .filter((t) => t.type === "credit")
      .reduce((s, t) => s + t.amount, 0),
    totalDebit: walletTransactions
      .filter((t) => t.type === "debit")
      .reduce((s, t) => s + t.amount, 0),
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Wallet Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Wallet className="text-green-600 mx-auto mb-1" size={24} />
            <div className="text-2xl font-extrabold text-green-700">
              ₹{totalStats.totalCredit.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Total Credits</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <IndianRupee className="text-red-500 mx-auto mb-1" size={24} />
            <div className="text-2xl font-extrabold text-red-600">
              ₹{totalStats.totalDebit.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Total Debits</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-extrabold text-blue-700">
              {walletTransactions.length}
            </div>
            <div className="text-xs text-gray-500">Total Transactions</div>
          </CardContent>
        </Card>
      </div>

      {/* Credit form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Credit / Debit User Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Select User *</Label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger className="mt-1" data-ocid="admin_wallet.select">
                  <SelectValue placeholder="User select karein" />
                </SelectTrigger>
                <SelectContent>
                  {regularUsers.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.fullName} ({u.memberId || u.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Type</Label>
              <Select
                value={type}
                onValueChange={(v) => setType(v as "credit" | "debit")}
              >
                <SelectTrigger className="mt-1" data-ocid="admin_wallet.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Amount (₹) *</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="500"
                className="mt-1"
                data-ocid="admin_wallet.input"
              />
            </div>
            <div>
              <Label className="text-xs">Description *</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Loan disbursement / Scholarship"
                className="mt-1"
                data-ocid="admin_wallet.input"
              />
            </div>
          </div>
          <Button
            onClick={handleCredit}
            className="bg-ngo-green text-white mt-4"
            data-ocid="admin_wallet.submit_button"
          >
            {type === "credit" ? "Credit Wallet" : "Debit Wallet"}
          </Button>
        </CardContent>
      </Card>

      {/* All transactions */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {walletTransactions.length === 0 ? (
            <div
              className="text-center py-10 text-gray-400"
              data-ocid="admin_wallet.empty_state"
            >
              Koi transaction nahi.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "User",
                      "Type",
                      "Amount",
                      "Description",
                      "Date",
                      "Balance",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2 text-left font-semibold text-gray-600 text-xs"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...walletTransactions].reverse().map((t, i) => {
                    const user = users.find((u) => u.id === t.userId);
                    return (
                      <tr
                        key={t.id}
                        className="border-t"
                        data-ocid={`admin_wallet.row.${i + 1}`}
                      >
                        <td className="px-3 py-2 font-medium">
                          {user?.fullName || t.userId}
                        </td>
                        <td className="px-3 py-2">
                          <Badge
                            className={`capitalize ${t.type === "credit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                          >
                            {t.type}
                          </Badge>
                        </td>
                        <td
                          className={`px-3 py-2 font-bold ${t.type === "credit" ? "text-green-700" : "text-red-600"}`}
                        >
                          {t.type === "credit" ? "+" : "-"}₹
                          {t.amount.toLocaleString()}
                        </td>
                        <td className="px-3 py-2">{t.description}</td>
                        <td className="px-3 py-2 text-xs text-gray-500">
                          {t.date}
                        </td>
                        <td className="px-3 py-2">
                          ₹{t.balance.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
