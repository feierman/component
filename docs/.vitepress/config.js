export default {
    title: 'My VitePress Site',
    description: 'A simple VitePress documentation site',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide' }
        ],
        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'Getting Started', link: '/index' }
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/your-username' }
        ]
    }
}