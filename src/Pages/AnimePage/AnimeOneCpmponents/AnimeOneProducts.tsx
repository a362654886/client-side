import * as React from "react";
import { useEffect, useState } from "react";
import { productAllGet, productDelete } from "../../../api/productAPI";
import AnimeButton, {
  MiddleDiv,
  MoreButtonDiv,
} from "../../../components/Button";
import {
  AnimOneProduct,
  AvatarImg,
  AvatarName,
  LinkP,
  ProductAvatarDiv,
  ProductBox,
  ProductBox1,
  ProductBox2,
  ProductBox3,
  ProductHeader,
  ProductImgDiv,
  SubtitleDiv,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneProductCss";
import avatarSetting from "../../../files/avatarSetting.png";
import {
  AnimeAddButtonDiv,
  AnimeAddButtonLeftDiv,
} from "../../../cssJs/AnimePage/AnimeOneCss";
import { Anime } from "../../../types/Amine";
import { Product } from "../../../types/ProductType";
import loadingImg from "../../../files/loading.gif";
import { LoadingImgDiv } from "../../../cssJs/homePageCss";
import { popUpAPIResult } from "../../../helperFns/popUpAlert";
import {
  AvatarSettingImg,
  DeleteDiv,
  TimeText,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOnePageCss";
import deleteIcon from "../../../files/deleteIcon.svg";
import getMoreImg from "../../../files/getMore.png";

interface IProps {
  anime: Anime | null;
  pageSizeSetting: number;
  ifShowHeader: boolean;
  ifShowAdd: boolean;
  toAddProduct?: (page: number) => void;
  toProduct?: (num: number) => void;
  discovery?: boolean;
}

const AnimeOneProducts = ({
  anime,
  pageSizeSetting,
  ifShowHeader,
  ifShowAdd,
  toAddProduct,
  toProduct,
  discovery,
}: IProps): JSX.Element => {
  const [productArr, setProductArr] = useState<Product[][] | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [update, setUpdate] = useState(0);

  const pageSize = pageSizeSetting;

  useEffect(() => {
    (async function anyNameFunction() {
      await getProducts();
    })();
  }, [pageNum]);

  useEffect(() => {
    getProductArr();
  }, [products, update]);

  const getProducts = async () => {
    setLoading(true);
    const productsResult = await productAllGet(
      anime ? anime._id : "",
      pageNum,
      pageSize
    );
    if (productsResult) {
      setProducts(products.concat(productsResult.result));
      setCount(productsResult.count);
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

  const deleteProduct = (productId: string) => {
    popUpAPIResult<Promise<number | null>>(
      productDelete(productId),
      "delete product fail"
    );
    const newProducts = products;
    const index = newProducts.map((product) => product._id).indexOf(productId);
    newProducts.splice(index, 1);
    setProducts(newProducts);
    setCount(count - 1);
    setUpdate(update + 1);
  };

  const getProductsDiv = (productArr: Product[] | null) => {
    if (productArr) {
      return productArr.map((product: Product, index: number) => {
        const date = new Date(product.uploadTime);
        return (
          <ProductBox key={index}>
            <ProductImgDiv src={product.productImg} />
            <LinkP>{`Here to buy>>`}</LinkP>
            <p>From</p>
            <ProductAvatarDiv>
              <AvatarImg>
                <img src={product.userAvatar} />
              </AvatarImg>
              <AvatarName>{product.userName}</AvatarName>
              <AvatarSettingImg src={`${avatarSetting}`} />
            </ProductAvatarDiv>
            <TimeText>{`${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`}</TimeText>
            {discovery ? (
              <div style={{ textAlign: "center" }}>
                <DeleteDiv onClick={() => deleteProduct(product._id)}>
                  <img src={`${deleteIcon}`} />
                  <AnimeButton
                    para=""
                    text={"Delete"}
                    width="47px"
                    height="32px"
                    textColor="black"
                    backGroundColor="#F6F6F6"
                    borderColor="#F6F6F6"
                    buttonClick={() => {
                      console.log("");
                    }}
                  />
                </DeleteDiv>
              </div>
            ) : (
              <ProductHeader>{product.anime}</ProductHeader>
            )}
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
    <AnimOneProduct>
      {!ifShowAdd && !ifShowHeader ? (
        <></>
      ) : (
        <>
          {ifShowAdd && ifShowHeader ? (
            <>
              <SubtitleDiv>
                <p
                  style={{
                    display:
                      ifShowAdd == true || ifShowHeader == true
                        ? "block"
                        : "none",
                  }}
                >
                  Post product shopping links here to tell those fans who want
                  it
                </p>
              </SubtitleDiv>
              <MiddleDiv>
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
              </MiddleDiv>
            </>
          ) : (
            <AnimeAddButtonLeftDiv
              style={{
                display: "flex",
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
            </AnimeAddButtonLeftDiv>
          )}
        </>
      )}
      {getExistProducts()}
      {getLoading()}
      {(ifShowAdd && ifShowHeader && count > 0) ||
      (!ifShowAdd && !ifShowHeader) ? (
        <>
          {products?.length < count ? (
            <MoreButtonDiv onClick={() => getMore()}>
              <div>
                <img src={`${getMoreImg}`} />
                <p>Load More</p>
              </div>
            </MoreButtonDiv>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <MiddleDiv>
            <AnimeButton
              para=""
              text={"View All"}
              width="120px"
              height="32px"
              textColor="#F5A623"
              backGroundColor="#FBFCDB"
              borderColor="#F5A623"
              buttonClick={() => (toProduct ? toProduct(2) : {})}
            />
          </MiddleDiv>
        </>
      )}
      <br />
    </AnimOneProduct>
  );
};

export default AnimeOneProducts;
