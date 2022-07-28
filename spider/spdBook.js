const axios = require('axios').default;
const cheerio = require('cheerio');
const Mock = require('mockjs');
const book = require('../ORM/book');

//获取html页面内容
async function getBooksHTML() {
    const response = await axios.get("https://book.douban.com/");
    return response.data;
}
async function getBookLink() {
    const html = await getBooksHTML();
    const $ = cheerio.load(html);
    const achorElements = $(".bd li .cover a");
    const links = achorElements
      .map((i, ele) => {
        const href = ele.attribs["href"];
        return href;
      })
      .get();
      links.splice(-5,5);
    return links;
  }

  //根据链接获取书籍信息
async function getBooksDetail(url){
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const name = $('#wrapper h1 span').text();
    const imgurl = $('#mainpic img').attr('src');
    const publishDate = Mock.mock("@date('yyyy-MM-dd')");
    const author = $('#info span:nth-child(1) a').text();
    return{
        name,
        imgurl,
        publishDate,
        author
    }
}
//获取所有书籍信息
async function fetchAll() {
    const links = await getBookLink(); //得到书籍的详情页地址
    const proms = links.map((link) => {
      return getBooksDetail(link);
    });
    return Promise.all(proms);
  }
  //将书籍信息添加到数据库中
  async function saveToDB() {
    const books = await fetchAll();
    await book.bulkCreate(books);
  }
saveToDB();
