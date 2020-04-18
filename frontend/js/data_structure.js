define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

    return {
        nonlocal_new_overview: {
            title: 'Overview of Non-local New Intakes (Undergraduates)',
            table: {
                cols: 7,
                headers: ['Type of Students', '2015-16', '2016-17', '2017-18', '2018-19', '2019-20', 'Overall'],
                body: [
                    {
                        class: 'yellowbg',
                        cells: [
                            ['International', '94', '153', '170', '301', '286', {
                                class: 'purpleclr',
                                val: '1004'
                            }],
                            ['Mainland China (Non Gaokao)','--','9','20','13','24',{
                                class: 'purpleclr',
                                val: '66'
                            }],
                            ['Mainland China (Gaokao)','206','207','209','216','215',{
                                class: 'purpleclr',
                                val: '1053'
                            }],
                        ]
                    },
                    {
                        class: 'bluebg',
                        cells: [
                            ['Total No. of New Intakes','300','369','399','530','525',{
                                class: 'purpleclr',
                                val: '2123'
                            }]
                        ]
                    },
                    {
                        class: 'graybg',
                        cells: [
                            ['No. of Representing Countries/Regions','13','27','30','29','28',{
                                class: 'purpleclr',
                                val: '53'
                            }]
                        ]
                    }
                ]
            },
            captions: ['* Source of information: Raw data pulled from AIMS after enrolment', '# There is some discrepancy between the AIMS data and Admission report to the Senate due date due to different census dates']
        }
    }
})
