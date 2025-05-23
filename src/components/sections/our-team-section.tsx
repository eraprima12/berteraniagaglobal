
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { teamMembers, TeamMember } from '@/data/content';
import { Users } from 'lucide-react';

export function OurTeamSection() {
  return (
    <section id="our-team" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals dedicated to bringing you the best of Indonesian coffee.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member: TeamMember) => (
            <Card key={member.id} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background">
              <CardHeader className="flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4 border-4 border-primary shadow-md">
                  <AvatarImage src={member.imageUrl} alt={member.name} data-ai-hint={member.imageHint} />
                  <AvatarFallback className="text-2xl bg-muted text-muted-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl text-primary">{member.name}</CardTitle>
                <p className="text-sm text-accent font-semibold">{member.title}</p>
              </CardHeader>
              <CardContent>
                <CardDescription>{member.bio}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
