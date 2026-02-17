const rows = [
  { text: ["DESIGN", "CREATIVITY", "VISION", "INNOVATION"], direction: 1 },
  { text: ["TYPOGRAPHY", "BRANDING", "MOTION", "IDENTITY"], direction: -1 },
  { text: ["CONCEPT", "STRATEGY", "AESTHETIC", "CRAFT"], direction: 1 },
  { text: ["CULTURE", "NARRATIVE", "IMPACT", "EXPRESSION"], direction: -1 },
];

const Word = ({ children }: { children: string }) => (
  <span className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-stroke select-none transition-colors duration-200 hover:text-primary hover:![-webkit-text-stroke:0] cursor-none" style={{ cursor: 'none' }}>
    {children}
  </span>
);

const Separator = () => (
  <span className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-stroke select-none mx-2">
    •
  </span>
);

const renderWords = (words: string[]) => (
  <>
    {words.map((word, i) => (
      <span key={i}>
        <Word>{word}</Word>
        <Separator />
      </span>
    ))}
  </>
);

const MarqueeRow = ({
  text,
  direction,
}: {
  text: string[];
  direction: number;
}) => (
  <div className="overflow-hidden whitespace-nowrap py-2 [&:hover_*]:!cursor-none" style={{ cursor: 'none' }}>
    <div
      className={`inline-block whitespace-nowrap ${
        direction === 1 ? "animate-marquee-left" : "animate-marquee-right"
      }`}
    >
      {renderWords(text)}
      {renderWords(text)}
    </div>
  </div>
);

const Marquee = () => {
  return (
    <section className="relative z-10 py-20 overflow-hidden">
      {rows.map((row, i) => (
        <MarqueeRow
          key={i}
          text={row.text}
          direction={row.direction}
        />
      ))}
    </section>
  );
};

export default Marquee;
