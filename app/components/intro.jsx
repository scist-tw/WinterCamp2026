import Link from "next/link";

export default function Intro() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12 font-intro">
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="font-medium text-2xl lg:text-4xl text-foreground/90 leading-relaxed font-light"
        >
          想讓寒假過得更加充實，留下更多回憶?<br />
          想增進自己的資訊能力與技術？<br />
          想認識更多志同道合的資訊圈朋友？<br />
          <span className="text-[oklch(0.75_0.15_85)] font-medium text-3xl lg:text-5xl block mt-6">
            那就來參加我們的聯合寒訓吧！
          </span>
        </p>
      </div>
    </section>
  );
}
