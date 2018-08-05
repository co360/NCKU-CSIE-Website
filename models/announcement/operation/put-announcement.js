const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { language = 'zh-TW', announcementId = 75, } = {} ) => {
    const table = await associations();

    const data = await table.announcement.findOne( {
        include: [
            {
                model:      table.announcementI18n,
                as:         'announcementI18n',
                where: {
                    language,
                },
            },
        ],
        where: {
            announcementId,
        },
    } )
    .then(
        announcement => {
            return Promise.all( [
                announcement.update( {
                    publishTime: new Date(),
                    author: 'Chen',
                    isPinned: true,
                    isPublished: true,
                    isApproved: true,
                } ),
                announcement.announcementI18n[ 0 ].update( {
                    title: '測2',
                    content: '內1',
                } ),
            ] )
        }
    ).then(
        announcement => announcement
    );

    table.database.close();

    return data;
};
