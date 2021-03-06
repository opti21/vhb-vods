import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Parser, { Item } from "rss-parser";
import ReactPlayer from "react-player";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

const Home: NextPage = () => {
  const [vods, setVods] = useState<Item[]>([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const parser = new Parser();

      const feed = await parser.parseURL(
        "https://vhb-proxy.herokuapp.com/https://vhb-vod-bot.herokuapp.com/rss"
      );

      setVods(feed.items);
    };

    fetchFeed();
  }, []);

  return (
    <>
      <Head>
        <title>VHB Vods</title>
        <meta
          name="description"
          content="Recorded VODs from veryhandsomebilly's streams"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen h-screen flex flex-col items-center bg-indigo-900 text-white overflow-y-auto overflow-x-hidden">
        <div className="w-screen max-w-2xl flex flex-col items-center">
          <h1 className="text-4xl font-bold mt-4">VHB VODS</h1>
          <a
            href={"https://vhb-vod-bot.herokuapp.com/rss"}
            className="no-underline hover:underline"
          >
            Rss Feed
          </a>
          <div className="p-4">
            {vods.map((vod, i) => {
              return (
                <div
                  key={i}
                  className="aspect-video my-2 p-2 bg-purple-700 rounded-md"
                >
                  <div className="mb-2">{dayjs(vod.pubDate).format("LLL")}</div>
                  <ReactPlayer
                    url={vod.link}
                    controls={true}
                    config={{ file: { forceHLS: true } }}
                    width={"100%"}
                    height={"100%"}
                  />
                  <a href={vod.link} className="no-underline hover:underline">
                    Direct Link
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
