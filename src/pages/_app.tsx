import Head from 'next/head';
import { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import './styles.css';
import styles from './MainLayout.module.css';

import { pages } from './samples/[slug]';

const title = 'WebGPU Samples';

const MainLayout: React.FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}) => {
  const router = useRouter();
  const samplesNames = Object.keys(pages);

  const [listExpanded, setListExpanded] = useState<boolean>(false);

  const oldPathSyntaxMatch = router.asPath.match(/(\?wgsl=[01])#(\S+)/);
  if (oldPathSyntaxMatch) {
    const slug = oldPathSyntaxMatch[2];
    router.replace(`/samples/${slug}`);
    return <></>;
  }

  return (
    <>
      <Head>
      </Head>
        <div className={styles.panelContents}>
            <ul className={styles.exampleList}>
              {samplesNames.map((slug) => {
                const className =
                  router.pathname === `/samples/fractalCube` &&
                  router.query['slug'] === slug
                    ? styles.selected
                    : undefined;
                return (
                  <li
                    key={slug}
                    className={className}
                    onMouseOver={() => {
                      pages[slug].render.preload();
                    }}
                  >
                    <Link
                      href={`/samples/fractalCube`}
                      onClick={() => {
                        setListExpanded(false);
                      }}
                    >
                      {slug}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        <Component {...pageProps} />
    </>
  );
};

export default MainLayout;
