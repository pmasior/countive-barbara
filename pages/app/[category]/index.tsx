import React from "react";
import Head from "next/head";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useSession } from "next-auth/react";
import { SWRConfig } from "swr";

import { getCategory } from "backend/repository/category";
import { getIcon } from "backend/repository/icon";
import { getEntityForUserInSSR } from "backend/auth/getEntityForUserInSSR";
import {
  API_CATEGORY_URL,
  API_FIND_SUBCATEGORY_BY_CATEGORY_URL,
  API_ICON_URL,
  API_TRANSACTION_URL,
} from "src/common/constants/urls";
import Body from "src/app/layouts/Category";
import { getSubcategoryForCategory } from "backend/repository/subcategory";
import { getTransaction } from "backend/repository/transaction";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await getEntityForUserInSSR(context, getCategory);
  const categoryFromParams = context.params?.category;
  const subcategories = await getEntityForUserInSSR(
    context,
    getSubcategoryForCategory,
    categoryFromParams
  );
  const transactions = await getEntityForUserInSSR(context, getTransaction);
  console.log(transactions);
  const icons = await getIcon();
  return {
    props: {
      fallback: {
        [API_CATEGORY_URL]: categories,
        [API_ICON_URL]: icons,
        [`${API_FIND_SUBCATEGORY_BY_CATEGORY_URL}${categoryFromParams}`]:
          subcategories,
        // [API_TRANSACTION_URL]: transactions,  // TODO: fix `object` ("[object Decimal]") cannot be serialized as JSON
        [API_TRANSACTION_URL]: [],
      },
    },
  };
};

const Category: NextPage = ({
  fallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useSession({ required: true });

  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        {/* TODO: is it good place for add material icons? */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <Body />
    </SWRConfig>
  );
};

export default Category;
