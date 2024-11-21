import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

export default function About() {
    return (
        <div className="flex min-h-screen flex-col items-center gap-4 p-6">
            {/* Drawer for the nutshell description */}
            <Drawer>
                <DrawerTrigger>
                    <Button variant="outline">In a Nutshell</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>In a Nutshell</DrawerTitle>
                        <DrawerDescription>
                            This project leverages meme interactions to predict and analyze user personalities. By gathering data from user engagement with memes, we provide personalized experiences that align with individual preferences and traits.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <DrawerClose>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* About Section */}
            <div className="max-w-5xl mx-auto mt-10">
                <h2 className="text-4xl font-bold text-center mb-6">About the Project</h2>

                {/* Paragraph 1 */}
                <div className="text-lg mb-6 text-left">
                    This innovative system uses advanced machine learning techniques to predict user personalities based on their interactions with memes. By collecting and analyzing data such as meme preferences, sentiment analysis, and engagement behavior, we create a rich personality profile for each user.
                </div>

                {/* Paragraph 2 */}
                <div className="text-lg mb-6 text-right">
                    The idea behind this project is to bridge the gap between entertainment and psychology. Memes are a universal form of expression in today’s digital age, and we saw an opportunity to use them as a window into understanding human behavior. By studying how people react to memes, we can learn about their preferences, moods, and personalities, creating a more engaging and meaningful digital experience.
                </div>

                {/* Paragraph 3 */}
                <div className="text-lg mb-6 text-left">
                    Our goal is to provide users with a more personalized and engaging experience, ensuring that they see memes that resonate with their unique personalities. Through continuous learning and feedback, the system adapts and improves its recommendations, offering an enriching interaction every time.
                </div>

                {/* IDEA Section */}
                <h3 className="text-3xl font-semibold mb-4 text-center">The Idea Behind the Project</h3>
                <div className="text-lg mb-6 text-right">
                    The core of this research is centered on harnessing meme interaction data to infer user personalities. This methodological approach comprises the following key stages:
                </div>

                {/* Methodology Points */}
                <ul className="list-inside list-disc text-lg mb-6 text-left">
                    <li><strong>Data Collection:</strong> Gathering comprehensive data on user interactions with memes, including likes, comments, shares, and viewing patterns across various platforms.</li>
                    <li><strong>Machine Learning for Personality Prediction:</strong> Using advanced algorithms to identify patterns and correlations between user behaviors and personality traits.</li>
                    <li><strong>Validation:</strong> Conducting user studies and statistical analyses to ensure model reliability and credibility.</li>
                </ul>

                <div className="text-lg mb-6 text-right">
                    This framework bridges digital behavior and psychological profiling, offering novel insights into personality inference through meme interactions.
                </div>

                {/* Research Design */}
                <h3 className="text-3xl font-semibold mb-4 text-center">Research Design</h3>
                <div className="text-lg mb-6 text-left">
                    The project employs a mixed-method approach, integrating both quantitative and qualitative techniques to provide a robust analysis of user personalities derived from meme interaction data.
                </div>

                {/* Quantitative Approach */}
                <h4 className="text-2xl font-semibold mb-2 text-right">Quantitative Approach</h4>
                <ul className="list-inside list-disc text-lg mb-6 text-right">
                    <li><strong>User Interaction Data Analysis:</strong> Collecting data on likes, upvotes, shares, and sentiment analysis to predict personality types.</li>
                    <li><strong>Machine Learning Implementation:</strong> Identifying behavioral patterns with models trained on interaction datasets.</li>
                </ul>

                {/* Qualitative Approach */}
                <h4 className="text-2xl font-semibold mb-2 text-left">Qualitative Approach</h4>
                <ul className="list-inside list-disc text-lg mb-6 text-left">
                    <li><strong>Verification through User Feedback:</strong> Gathering feedback to refine models and capture nuances not addressed by quantitative data.</li>
                    <li><strong>Personality Surveys:</strong> Comparing predictions with self-reported data for cross-verification.</li>
                </ul>

                <div className="text-lg mb-6 text-right">
                    By integrating these methods, the research ensures a balanced analysis, combining the precision of quantitative data with the depth of qualitative insights.
                </div>
            </div>
        </div>
    );
}
