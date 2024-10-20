import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const tips = [
  "Reduce plastic use wherever possible to help the environment and conserve resources. Remember that even small changes can make a big difference in reducing waste!",
  "Always recycle your waste responsibly. Check local guidelines to ensure you're recycling properly, as contamination can lead to entire batches being sent to landfill.",
  "Compost organic waste to reduce landfill. Composting not only decreases the amount of waste sent to landfills but also provides nutrient-rich soil for gardening.",
  "Participate in local clean-up drives. Engaging with your community not only helps the environment but also raises awareness about littering and waste management.",
  "Educate others about waste management. Sharing knowledge and best practices can inspire others to adopt more sustainable habits.",
];
export default function GreenInsightsCard() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
        setFade(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <Textarea
      className={`max-h-[180px] italic mt-2 pt-3 text-md rounded-lg text-muted-foreground transition-opacity duration-900 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
      readOnly
      rows={4}
      value={`💚 Green Insights\n\n${tips[currentTipIndex]}`}
    />
  );
}
