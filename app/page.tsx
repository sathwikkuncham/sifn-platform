import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Lightbulb, CheckSquare, FlaskConical, Rocket, Brain, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl mb-4">
          <Zap className="h-6 w-6 text-primary mr-2" />
          <span className="text-sm font-medium">Startup Idea Framework Navigator</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 heading-gradient">
          Transform Your Startup Ideas Into Reality
        </h1>
        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
          A comprehensive platform to generate, evaluate, validate, and execute your startup ideas using proven
          frameworks and methodologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-6">
          <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Idea Genesis</h3>
          <p className="text-foreground/70 mb-4">
            Generate promising startup ideas using proven frameworks and methodologies from Y Combinator and successful
            founders.
          </p>
          <Link href="/modules/idea-genesis">
            <Button variant="outline" className="w-full group">
              Explore Ideas
              <ArrowRight className="ml-2 h-4 w-4 hover-translate" />
            </Button>
          </Link>
        </div>

        <div className="glass-card p-6">
          <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
            <CheckSquare className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Idea Evaluation</h3>
          <p className="text-foreground/70 mb-4">
            Evaluate your startup ideas against proven criteria to identify the most promising opportunities worth
            pursuing.
          </p>
          <Link href="/modules/idea-evaluation">
            <Button variant="outline" className="w-full group">
              Evaluate Ideas
              <ArrowRight className="ml-2 h-4 w-4 hover-translate" />
            </Button>
          </Link>
        </div>

        <div className="glass-card p-6">
          <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
            <FlaskConical className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Validation</h3>
          <p className="text-foreground/70 mb-4">
            Test your assumptions and validate your ideas with real users before investing significant time and
            resources.
          </p>
          <Link href="/modules/validation">
            <Button variant="outline" className="w-full group">
              Validate Ideas
              <ArrowRight className="ml-2 h-4 w-4 hover-translate" />
            </Button>
          </Link>
        </div>

        <div className="glass-card p-6">
          <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
            <Rocket className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Execution</h3>
          <p className="text-foreground/70 mb-4">
            Turn your validated ideas into reality with structured execution frameworks and practical tools for
            founders.
          </p>
          <Link href="/modules/execution">
            <Button variant="outline" className="w-full group">
              Execute Ideas
              <ArrowRight className="ml-2 h-4 w-4 hover-translate" />
            </Button>
          </Link>
        </div>

        <div className="glass-card p-6">
          <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">AI Augmentation</h3>
          <p className="text-foreground/70 mb-4">
            Leverage AI to enhance your startup ideation, evaluation, and execution processes with intelligent insights.
          </p>
          <Link href="/modules/ai-augmentation">
            <Button variant="outline" className="w-full group">
              Explore AI Tools
              <ArrowRight className="ml-2 h-4 w-4 hover-translate" />
            </Button>
          </Link>
        </div>

        <div className="glass-card p-6">
          <div className="bg-background/50 p-3 rounded-lg w-fit mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Startup Guides</h3>
          <p className="text-foreground/70 mb-4">
            Access comprehensive guides based on Y Combinator and Paul Graham's startup wisdom to guide your journey.
          </p>
          <Link href="/guides">
            <Button className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 group">
              Read Guides
              <ArrowRight className="ml-2 h-4 w-4 hover-translate" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="glass-card bg-primary/10 dark:bg-primary/20 border border-primary/20 p-4 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Startup Journey?</h2>
        <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
          Begin with our structured approach to transform your ideas into successful startups. Our platform guides you
          through each step of the process.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/modules/onboarding">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 w-full sm:w-auto"
            >
              Start Your Journey
            </Button>
          </Link>
          <Link href="/guides">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Explore Guides
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
