import * as React from "react";
import { useEffect, useState } from "react";
import { merchandisesGet } from "../../api/merchandiseApi";
import { postsGet } from "../../api/postAPI";
import {
  LowerBody,
  LowerBodyContext,
  RecommendDiv,
  RecommendSlider,
} from "../../cssJs/publicCss";
import {
  Merchandise,
  MerchandiseReturnBody,
} from "../../types/MerchandiseType";
import { Post, PostReturnBody } from "../../types/PostType";
import { SliderDiv } from "../conponentDivs/SliderDiv";
import RecommendPosts from "./RecommendPosts";

const HomePage = (): JSX.Element => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [merchandises, setMerchandises] = useState<Merchandise[]>([]);
  const [num, serRefresh] = useState(0);

  useEffect(() => {
    (async function anyNameFunction() {
      await getTopPost();
      await getTopMerchandise();
    })();
  }, []);

  useEffect(() => {
    console.log(posts);
    console.log(merchandises);
  }, [num]);

  const getTopPost = async () => {
    const result: PostReturnBody = await postsGet(
      ``,
      1,
      7,
      "response",
      "",
      "all"
    );
    setPosts(result.posts);
    refresh();
  };

  const getTopMerchandise = async () => {
    const result: MerchandiseReturnBody | null = await merchandisesGet(
      1,
      7,
      "likeNum",
      "",
      "all"
    );
    setMerchandises(result?.merchandises as Merchandise[]);
    refresh();
  };

  const refresh = () => {
    const n = num + 1;
    serRefresh(n);
  };

  return (
    <>
      <RecommendDiv>
        <RecommendSlider>
          <SliderDiv />
        </RecommendSlider>
        <RecommendPosts
          posts={posts}
          merchandises={merchandises}
        />
      </RecommendDiv>
      <LowerBody>
        <LowerBodyContext>
          <h5>Monga</h5>
          <div>
            <div>Monga1</div>
            <div>Monga2</div>
            <div>Monga3</div>
          </div>
        </LowerBodyContext>
        <LowerBodyContext>
          <h5>Music</h5>
          <div>
            <div>Music1</div>
            <div>Music2</div>
            <div>Music3</div>
          </div>
        </LowerBodyContext>
        <LowerBodyContext>
          <h5>Wallpaper</h5>
          <div>
            <div>Wallpaper1</div>
            <div>Wallpaper2</div>
            <div>Wallpaper3</div>
          </div>
        </LowerBodyContext>
      </LowerBody>
    </>
  );
};

export default HomePage;
