import * as React from "react";
import { useEffect, useState } from "react";
import { productAllGet, productDelete } from "../../../api/productAPI";
import AnimeButton, {
  MiddleBiggerDiv,
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
import { AnimeAddButtonLeftDiv } from "../../../cssJs/AnimePage/AnimeOneCss";
import { Anime } from "../../../types/Amine";
import { Product } from "../../../types/ProductType";
import loadingImg from "../../../files/loading.gif";
import { LoadingImgDiv } from "../../../cssJs/homePageCss";
import { popUpAPIResult } from "../../../helperFns/popUpAlert";
import {
  DeleteDiv,
  TimeMiddleText,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOnePageCss";
import deleteIcon from "../../../files/deleteIcon.svg";
import getMoreImg from "../../../files/getMore.svg";
import moreRightImg from "../../../files/moreRightArrow.svg";
import { MoreRight } from "../../../cssJs/basicCss";
import SettingImg from "../../../components/SettingImg";
import ProfileWrapperDiv from "../../../components/ProfileWrapperDiv";
import Flag from "react-flagkit";
import { flagGet } from "../../../helperFns/flag";
import { User } from "../../../types/User";
import { useSelector } from "react-redux";
import { IStoreState } from "../../../types/IStoreState";
import DeleteWrapperDiv from "../../../components/DeleteWrapperDiv";
import { IfLoginCheck } from "../../../helperFns/loginCheck";
import { getWidth } from "../../../helperFns/widthFn";
import { formatName } from "../../../helperFns/nameFn";
import { ReportContextType } from "../../../types/blockType";
import { windowLink } from "../../../globalValues";
import { openNewWindow } from "../../../helperFns/windowsFn";

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
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const chooseAnime: Anime | null = useSelector(
    (state: IStoreState) => state.animeState
  );

  const [productArr, setProductArr] = useState<Product[][] | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [update, setUpdate] = useState(0);

  const pageSize = pageSizeSetting;

  useEffect(() => {
    if (pageNum > 1) {
      (async function anyNameFunction() {
        await getProducts();
      })();
    }
  }, [pageNum]);

  useEffect(() => {
    (async function anyNameFunction() {
      if (chooseAnime || (discovery == true && pageNum == 1)) {
        await getIniProducts();
      }
    })();
  }, [chooseAnime, discovery]);

  useEffect(() => {
    getProductArr();
  }, [products, update]);

  const getProducts = async () => {
    setLoading(true);
    const productsResult = await productAllGet(
      discovery ? "" : chooseAnime ? chooseAnime._id : "",
      pageNum,
      pageSize
    );
    if (productsResult) {
      setProducts(products.concat(productsResult.result));
      setCount(productsResult.count);
    }
    setLoading(false);
  };

  const getIniProducts = async () => {
    setLoading(true);
    const productsResult = await productAllGet(
      discovery ? "" : chooseAnime ? chooseAnime._id : "",
      pageNum,
      pageSize
    );
    if (productsResult) {
      setProducts(productsResult.result);
      setCount(productsResult.count);
    }
    setLoading(false);
  };

  const getProductArr = () => {
    const arr1: Product[] = [];
    const arr2: Product[] = [];
    const arr3: Product[] = [];
    if (products) {
      products
        .filter((item) => !item.hide)
        .forEach((product, index) => {
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
    }
    setProductArr([arr1, arr2, arr3]);
  };

  const deleteProduct = (productId: string) => {
    popUpAPIResult<Promise<number | null>>(
      productDelete(productId),
      "delete product fail",
      () => ""
    );
    const newProducts = products;
    const index = newProducts.map((product) => product._id).indexOf(productId);
    newProducts.splice(index, 1);
    setProducts(newProducts);
    setCount(count - 1);
    setUpdate(update + 1);
  };

  const getDeleteButton = (product: Product) => {
    if (loginUser && loginUser._id == product.userId) {
      return (
        <DeleteWrapperDiv
          element={
            <DeleteDiv>
              <img src={`${deleteIcon}`} />
              <AnimeButton
                para=""
                text={"Delete"}
                width="55px"
                height="32px"
                textColor="black"
                backGroundColor="#F6F6F6"
                borderColor="#F6F6F6"
                buttonClick={() => {
                  console.log("");
                }}
              />
            </DeleteDiv>
          }
          deleteFn={() => deleteProduct(product._id)}
        />
      );
    } else {
      return <></>;
    }
  };

  const getProductsDiv = (productArr: Product[] | null) => {
    if (productArr) {
      return productArr.map((product: Product, index: number) => {
        const date = new Date(product.uploadTime);
        return (
          <ProductBox
            style={{
              width: getWidth() > 600 ? "100%" : "240px",
              margin: getWidth() > 600 ? "" : "16px auto",
            }}
            key={index}
          >
            <ProductImgDiv
              onClick={() => {
                window.open(product.link, "_blank");
              }}
              src={product.productImg}
            />
            <LinkP
              onClick={() => {
                window.open(product.link, "_blank");
              }}
            >{`Here to buy>>`}</LinkP>
            <p>From</p>
            <ProductAvatarDiv>
              <ProfileWrapperDiv
                userId={product.userId}
                element={
                  <>
                    <AvatarImg>
                      <img src={product.userAvatar} />
                    </AvatarImg>
                    <AvatarName>
                      {formatName(product.userName)}
                      <Flag
                        style={{ marginLeft: "5px" }}
                        country={flagGet(
                          product.userCountry ? product.userCountry : ""
                        )}
                      />
                    </AvatarName>
                  </>
                }
              ></ProfileWrapperDiv>
              <SettingImg
                userId={product.userId}
                userName={product.userName}
                userImg={product.userAvatar}
                marginTop="24px"
                type={ReportContextType.PRODUCT}
                contextId={product._id}
                resourceLink={`${windowLink}/anime?${chooseAnime?._id}`}
              />
            </ProductAvatarDiv>
            <TimeMiddleText>{`${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`}</TimeMiddleText>
            {discovery ? (
              <ProductHeader
                onClick={() => {
                  openNewWindow(`${windowLink}/anime?${product.anime}`);
                }}
              >
                {product.animeName}
              </ProductHeader>
            ) : (
              <div style={{ textAlign: "center" }}>
                {getDeleteButton(product)}
              </div>
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
      <div
        style={{
          display: getWidth() > 600 ? "flex" : "inline",
          marginTop: "16px",
        }}
      >
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
                  buttonClick={() =>
                    IfLoginCheck(loginUser)
                      ? toAddProduct
                        ? toAddProduct(5)
                        : ""
                      : ""
                  }
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
                buttonClick={() =>
                  IfLoginCheck(loginUser)
                    ? toAddProduct
                      ? toAddProduct(5)
                      : ""
                    : ""
                }
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
      ) : products.length > 0 ? (
        <>
          <MiddleBiggerDiv>
            <MoreRight onClick={() => (toProduct ? toProduct(2) : {})}>
              <img src={moreRightImg} />
              <p>More</p>
            </MoreRight>
          </MiddleBiggerDiv>
        </>
      ) : (
        <>Welcome the first one.</>
      )}
      <br />
    </AnimOneProduct>
  );
};

export default AnimeOneProducts;
