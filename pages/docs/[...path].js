import { useRouter } from 'next/router'
import matter from 'gray-matter'
const fs = require("fs")
import path from 'path'
import Link from 'next/link'
import Sidebar from '../../components/sidebar.jsx'
import DocsLayout from '../../components/docs.layout.jsx'
import Navbar from '../../components/navbar.jsx'
import DocsTitle from '../../components/docs.title.jsx'
import unified from 'unified'
import markdown from 'remark-parse'
import highlight from 'remark-highlight.js'
import html from 'remark-html'
import Head from 'next/head'

const Post = ({ content, title }) => {
	const { pathname, query } = useRouter()
	const { path } = query
	return (
		<div>
			<Head>
				<title>Docs | {title}</title>
			</Head>
			<div style={{height: 100}}>
				<Navbar/>
			</div>
			<DocsLayout>
				<div>
					<Sidebar/>
				</div>
				<div className="container">
					<DocsTitle>{title}</DocsTitle>
					<div>
						<div className="markdown-container" dangerouslySetInnerHTML={{ __html: content }}/>
						<div className="spacing"/>
					</div>
				</div>
			</DocsLayout>
		</div>
	)
}

const getContentByPath = (docs, paths) => {
	return docs[paths.toString().replace(/,/gm,'/')]
}

export async function getStaticProps({ params: { path } }) {
	const { content, data } =  matter(fs.readFileSync(`${process.cwd()}/docs/${path.join('/')}.md`, 'UTF-8'))
	const result = await unified()
		.use(markdown)
		.use(highlight) 
		.use(html)
		.process(content)
	return {
		props: {
			...data,
			content: result.toString()
		}
	}
}

const getDirList = where => {
	const files = fs.readdirSync(where);
	let tree = [ ]
	files.map(file => {
		if(fs.lstatSync(path.join(where, file)).isDirectory()){
			tree = [...tree, ...getDirList(path.join(where, file))]
		}else{
			if(!file.includes('.json')){
				const { data } =  matter(fs.readFileSync(path.join(where, file), 'UTF-8'))
				tree.push({
					params:{
						path: [...data.slug.toLowerCase().split('/')],
						slug: data.slug.toLowerCase(),
					}
				})
				
			}
		}
	})
	return tree
}

export async function getStaticPaths(path) {
	const paths = getDirList(`${process.cwd()}/docs`)
	return {
		paths,
		fallback: false,
	};
}

export default Post
