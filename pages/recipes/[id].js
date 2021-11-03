import { getAllRecipesId, getSingleRecipe } from '../../lib/recipes';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Recipe.module.css';

export async function getStaticProps({ params }) {
    const data = await getSingleRecipe(params.id);

    return {
        props: {
            data,
        },
    };
}

export async function getStaticPaths() {
    const paths = await getAllRecipesId();

    return {
        paths,
        fallback: false,
    };
}

const Recipe = ({ data }) => {
    console.log(data);
    return (
        <div className={styles.container}>
            <Head>
                <title>{data.recipeData.title.rendered}</title>
                <meta name="description" content={data.recipeData.content.rendered} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.grid}>
                    <div className={styles.recipePhoto}>
                        <Image
                            src={data.recipeData.acf.recipe_photo.url}
                            height={data.recipeData.acf.recipe_photo.height}
                            width={data.recipeData.acf.recipe_photo.width}
                            alt=""
                        />
                    </div>

                    <div className={styles.recipeContent}>
                        <h1 className={styles.title}>{data.recipeData.title.rendered}</h1>

                        <div className={styles.info}>
                            <div className={styles.info__item}>
                                <p>
                                    Tür：<strong>{data.recipeData.acf.recipe_type}</strong>
                                </p>
                            </div>
                            <div className={styles.info__item}>
                                <p>
                                    Tat：<strong>{data.recipeData.acf.recipe_flavor}</strong>
                                </p>
                            </div>
                            <div className={styles.info__item}>
                                <p>
                                    Zaman：<strong>{data.recipeData.acf.recipe_time}</strong>
                                </p>
                            </div>
                            <div className={styles.info__item}>
                                <p>
                                    Seviye：<strong>{data.recipeData.acf.recipe_difficulty}</strong>
                                </p>
                            </div>
                        </div>

                        <div
                            className={styles.recipeDescription}
                            dangerouslySetInnerHTML={{ __html: data.recipeData.content.rendered }}
                        />

                        <Link href="/">
                            <a className={styles.backToRecipes}>Back to home</a>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Recipe;
