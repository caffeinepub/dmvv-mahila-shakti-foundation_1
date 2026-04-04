import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Calendar, FileCheck, Shield } from "lucide-react";

export default function LegalDocuments() {
  const { legalDocuments } = useApp();
  const active = [...legalDocuments]
    .filter((d) => d.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Shield size={48} className="text-green-200" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Legal Documents
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            All legal documents of DMVV Bhartiy Mahila Shakti Foundation —
            registration, tax exemption, and government approvals.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {active.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Shield size={48} className="mx-auto mb-3" />
            <p>Documents will be available soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {active.map((doc) => (
              <Card
                key={doc.id}
                className="border border-green-100 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {doc.imageUrl ? (
                      <img
                        src={doc.imageUrl}
                        alt={doc.title}
                        className="w-20 h-20 object-cover rounded-lg border border-green-200 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-green-50 rounded-lg border border-green-200 flex items-center justify-center flex-shrink-0">
                        <FileCheck size={32} className="text-green-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <Badge className="mb-2 bg-green-100 text-green-800 hover:bg-green-100">
                        {doc.documentType}
                      </Badge>
                      <h3 className="font-bold text-gray-900 text-base mb-1">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {doc.description}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Shield size={12} className="text-green-600" />
                          <span>Issued by: {doc.issuedBy}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar size={12} className="text-green-600" />
                          <span>Issue Date: {doc.issuedDate}</span>
                          {doc.expiryDate && (
                            <span className="text-orange-600">
                              {" "}
                              | Valid till: {doc.expiryDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
