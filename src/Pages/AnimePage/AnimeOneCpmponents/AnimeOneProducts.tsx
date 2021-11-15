import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { productAllGet } from "../../../api/productAPI";
import AnimeButton, { MiddleDiv } from "../../../components/Button";
import {
  AvatarImg,
  AvatarName,
  LinkP,
  ProductBox,
  ProductBox1,
  ProductBox2,
  ProductBox3,
  ProductImgDiv,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneProductCss";
import {
  AnimOneVideo,
  Subtitle,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneVideoCss";
import { AnimeAddButtonDiv } from "../../../cssJs/AnimePage/AnimeOneCss";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { Anime } from "../../../types/Amine";
import { LoadingType } from "../../../types/EnumTypes";
import { Product } from "../../../types/ProductType";
import loadingImg from "../../../files/loading.gif";
import { LoadingImgDiv } from "../../../cssJs/homePageCss";

interface IProps {
  anime: Anime | null;
  pageSizeSetting: number;
  ifShowHeader: boolean;
  ifShowAdd: boolean;
  toAddProduct?: (page: number) => void;
}

const AnimeOneProducts = ({
  anime,
  pageSizeSetting,
  ifShowHeader,
  ifShowAdd,
  toAddProduct,
}: IProps): JSX.Element => {
  const [productArr, setProductArr] = useState<Product[][] | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const pageSize = pageSizeSetting;

  const dispatch = useDispatch();

  useEffect(() => {
    (async function anyNameFunction() {
      await getProducts();
    })();
  }, [pageNum]);

  useEffect(() => {
    getProductArr();
  }, [products]);

  const getProducts = async () => {
    setLoading(true);
    const productsResult = await productAllGet(
      anime ? anime._id : "",
      pageNum,
      pageSize
    );
    if (productsResult) {
      setProducts(products.concat(productsResult.result));
    }
    setLoading(false);
  };

  const getProductArr = () => {
    const arr1: Product[] = [];
    const arr2: Product[] = [];
    const arr3: Product[] = [];
    products?.forEach((product, index) => {
      if ((index - 3) % 3 == 0 || index == 0) {
        arr1.push(product);
      }
      if ((index - 3) % 3 == 1 || index == 1) {
        arr2.push(product);
      }
      if ((index - 3) % 3 == 2 || index == 2) {
        arr3.push(product);
      }
    });
    setProductArr([arr1, arr2, arr3]);
  };

  const getProductsDiv = (productArr: Product[] | null) => {
    if (productArr) {
      return productArr.map((product: Product, index: number) => {
        return (
          <ProductBox key={index}>
            <ProductImgDiv src={product.productImg} />
            <LinkP>Here to buy</LinkP>
            <p>From</p>
            <AvatarImg>
              <img src={product.userAvatar} />
            </AvatarImg>
            <AvatarName>{product.userName}</AvatarName>
            <div style={{ textAlign: "center" }}>
              <AnimeButton
                para=""
                text={"Delete"}
                width="120px"
                height="32px"
                textColor="black"
                backGroundColor="white"
                borderColor="#302D46"
                buttonClick={() => console.log("s")}
              />
            </div>
          </ProductBox>
        );
      });
    } else {
      return <></>;
    }
  };

  const getExistProducts = () => {
    return (
      <div style={{ display: "flex", marginTop: "16px" }}>
        <ProductBox1>
          {getProductsDiv(productArr ? productArr[0] : null)}
        </ProductBox1>
        <ProductBox2>
          {getProductsDiv(productArr ? productArr[1] : null)}
        </ProductBox2>
        <ProductBox3>
          {getProductsDiv(productArr ? productArr[2] : null)}
        </ProductBox3>
      </div>
    );
  };

  const getMore = () => {
    const newPage = pageNum + 1;
    setPageNum(newPage);
  };

  const getLoading = () =>
    loading ? (
      <LoadingImgDiv>
        <img src={`${loadingImg}`} />
      </LoadingImgDiv>
    ) : (
      <></>
    );

  return (
    <AnimOneVideo>
      <div
        style={{
          marginBottom: "16px",
        }}
      >
        <Subtitle
          style={{
            display: ifShowHeader ? "inline" : "none",
          }}
        >
          Post product shopping links here to tell those fans who want it
        </Subtitle>
      </div>
      <AnimeAddButtonDiv
        style={{
          marginTop: "16px",
          display: ifShowAdd == true || ifShowHeader == true ? "flex" : "none",
        }}
      >
        <h6>Products</h6>
        <AnimeButton
          para=""
          text={"Add"}
          width="120px"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() => (toAddProduct ? toAddProduct(5) : "")}
        />
      </AnimeAddButtonDiv>
      {getExistProducts()}
      {getLoading()}
      <MiddleDiv>
        <AnimeButton
          para=""
          text={"View More"}
          width="120px"
          height="32px"
          textColor="#F5A623"
          backGroundColor="#FBFCDB"
          borderColor="#F5A623"
          buttonClick={() => getMore()}
        />
      </MiddleDiv>
      <br />
    </AnimOneVideo>
  );
};

export default AnimeOneProducts;
