import { ResponsivePie } from "@nivo/pie";

const Piechart = ({ data }) => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={8}
      borderColor={{
        from: "color",
        modifiers: [["opacity", 0.2]],
      }}
      colors={{scheme:"category10"}}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(193, 151, 151, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "meeting",
          },
          id: "dots",
        },
        {
          match: {
            id: "break",
          },
          id: "lines",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        // {
        //   match: {
        //     id: "python",
        //   },
        //   id: "dots",
        // },
        // {
        //   match: {
        //     id: "scala",
        //   },
        //   id: "lines",
        // },
        // {
        //   match: {
        //     id: "lisp",
        //   },
        //   id: "lines",
        // },
        // {
        //   match: {
        //     id: "elixir",
        //   },
        //   id: "lines",
        // },
        // {
        //   match: {
        //     id: "javascript",
        //   },
        //   id: "lines",
        // },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 2,
          symbolSize: 18,
          symbolShape: "square",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Piechart;
