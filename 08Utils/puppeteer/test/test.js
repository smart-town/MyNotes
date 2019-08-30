const puppeteer = require("puppeteer-core");
const whichchrome = require("which-chrome");
let { EventEmitter } = require('events');
var EventEmitterEnhancer = require('event-emitter-enhancer');
var EnhancedEventEmitter = EventEmitterEnhancer.extend(EventEmitter);

let chrome = whichchrome.Chrome || whichchrome.Chromium;
console.log(chrome);

(async ()=>{
const browser =await puppeteer.launch({headless:false,executablePath:chrome});
const page = await browser.newPage();
page.goto("https://www.baidu.com");
let client = await page.target().createCDPSession()
EventEmitterEnhancer.modifyInstance(client);
client.else(
    (action,data)=>{
        
        console.log("received:  "+action);
       
    }
)
await page.goto("https://www.bing.com");


})();
