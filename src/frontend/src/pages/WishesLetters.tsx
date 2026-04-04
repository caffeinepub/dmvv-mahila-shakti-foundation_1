import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Building2, Calendar, Heart, Quote } from "lucide-react";

export default function WishesLetters() {
  const { wishesLetters } = useApp();
  const active = [...wishesLetters]
    .filter((w) => w.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-700 to-purple-700 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Heart size={48} className="text-pink-200" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Wishes &amp; Greetings
          </h1>
          <p className="text-pink-100 text-lg max-w-2xl mx-auto">
            Dignitaries, leaders and distinguished individuals have expressed
            their support for DMVV Foundation and shared their wishes and
            blessings.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {active.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Heart size={48} className="mx-auto mb-3" />
            <p>Wishes letters will be available soon.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {active.map((w) => (
              <Card
                key={w.id}
                className="border border-pink-100 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-6">
                    {w.photoUrl ? (
                      <img
                        src={w.photoUrl}
                        alt={w.senderName}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-4 border-pink-200 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full border-4 border-pink-200 flex items-center justify-center flex-shrink-0">
                        <Heart size={32} className="text-pink-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <h3 className="font-extrabold text-gray-900 text-lg">
                            {w.senderName}
                          </h3>
                          {w.senderDesignation && (
                            <p className="text-pink-700 font-semibold text-sm">
                              {w.senderDesignation}
                            </p>
                          )}
                          {w.senderOrganization && (
                            <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                              <Building2 size={11} />
                              <span>{w.senderOrganization}</span>
                            </div>
                          )}
                        </div>
                        {w.letterDate && (
                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <Calendar size={11} />
                            <span>{w.letterDate}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 relative">
                        <Quote
                          size={20}
                          className="text-pink-200 absolute -top-1 -left-1"
                        />
                        <p className="text-gray-700 leading-relaxed pl-5 italic">
                          {w.message}
                        </p>
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
