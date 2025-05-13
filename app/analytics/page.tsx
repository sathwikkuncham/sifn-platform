import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  PieChart,
  Activity,
  TrendingUp,
  Users,
  Lightbulb,
  CheckSquare,
  FlaskConical,
  Rocket,
} from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track your progress and insights across your startup journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ideas Generated</CardTitle>
            <CardDescription>Total startup ideas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12</div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Lightbulb className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+3</span> in the last 30 days
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ideas Evaluated</CardTitle>
            <CardDescription>Completed evaluations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">8</div>
              <div className="bg-primary/10 p-2 rounded-full">
                <CheckSquare className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+2</span> in the last 30 days
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Validation Tests</CardTitle>
            <CardDescription>Completed validations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">5</div>
              <div className="bg-primary/10 p-2 rounded-full">
                <FlaskConical className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+1</span> in the last 30 days
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Execution Progress</CardTitle>
            <CardDescription>Active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2</div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Rocket className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+1</span> in the last 30 days
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-primary/10 dark:bg-primary/20 border border-primary/20">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>Your recent platform activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg flex items-center justify-center">
                    <Activity className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Track your recent activities across the platform, including idea generation, evaluation, validation,
                    and execution.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Metrics</CardTitle>
                <CardDescription>Platform usage statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg flex items-center justify-center">
                    <LineChart className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    View detailed metrics about your platform usage, including time spent, features used, and progress
                    made.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ideas" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Idea Portfolio</CardTitle>
              <CardDescription>Overview of your startup ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg flex items-center justify-center">
                  <PieChart className="h-12 w-12 text-primary" />
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Analyze your portfolio of startup ideas, including their evaluation scores, validation results, and
                    current status.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Startup Journey Progress</CardTitle>
              <CardDescription>Track your progress through the startup journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-12 w-12 text-primary" />
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Monitor your progress through each stage of the startup journey, from idea generation to execution
                    and beyond.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Personalized insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Receive AI-generated insights and recommendations based on your startup activities, progress, and
                    patterns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
