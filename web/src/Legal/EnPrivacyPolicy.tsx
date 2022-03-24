import { Content } from 'react-bulma-components';
import { Link } from 'react-router-dom';

import useScrollTop from '../hooks/useScrollTop';
import routes from '../services/routes';

const EnPrivacyPolicy: React.FC = () => {
  useScrollTop();

  return (
    <Content>
      <h1 className="title is-1" style={{ marginTop: 30 }}>
        Data protection policy
      </h1>
      <p>
        In the following we will inform you about the processing of your personal data in the
        context of the use of our online offer.
      </p>
      <p>
        <strong>Responsible person</strong>
      </p>
      <p>
        The name and contact details of the person responsible can be found in the{' '}
        <Link to={routes.aboutUs} title="Impressum">
          imprint
        </Link>
        .
      </p>
      <p>
        <strong>Contact person</strong>
      </p>
      <p>
        If you have any questions about data protection, please use the contact details given in the{' '}
        <Link to={routes.aboutUs} title="Impressum">
          legal notice
        </Link>
        .
      </p>
      <p>
        <strong>Storage period</strong>
      </p>
      <p>
        We generally delete your personal data when they are no longer necessary for the purposes
        for which they were collected or otherwise processed.
      </p>
      <p>
        If we have asked for your consent and you have given it, we will delete your personal data
        if you revoke your consent and there is no other legal basis for processing.
      </p>
      <p>
        We delete your personal data if you object to the processing and there are no overriding
        legitimate reasons for the processing or if you object to the processing for the purpose of
        direct advertising or related profiling.
      </p>
      <p>
        If deletion is not possible because processing is still necessary to fulfill a legal
        obligation (statutory retention periods, etc.) to which we are subject, or to assert,
        exercise or defend legal claims, we will restrict the processing of your personal data.
      </p>
      <p>Further information on the storage period can also be found in the following passages.</p>
      <p>
        <strong>Your rights</strong>
      </p>
      <p>
        You have the following rights towards us with regards to your personal data:
        <br />
        - Right to information
        <br />
        - Right to rectification
        <br />
        - Right to deletion
        <br />
        - Right to restriction of processing
        <br />
        - Right to object to processing
        <br />- Right to data portability
      </p>
      <p>
        <strong>
          You have the right, for reasons that arise from your particular situation, to object at
          any time to the processing of your personal data, which is based on Article 6 (1) (e) or
          (f) GDPR; this also applies to profiling based on these provisions. We will then no longer
          process your personal data unless we can prove compelling legitimate reasons for the
          processing that outweigh your interests, rights and freedoms, or the processing serves to
          assert, exercise or defend legal claims.
        </strong>
      </p>
      <p>
        <strong>
          If we process your personal data for the purpose of direct advertising, you have the right
          to object at any time to the processing of your personal data for the purpose of such
          advertising; this also applies to profiling insofar as it is associated with such direct
          advertising. We will then no longer process your personal data for these purposes.
        </strong>
      </p>
      <p>
        You have the right to revoke your consent to the processing of your personal data at any
        time if you have given us such consent. Withdrawing your consent does not affect the
        legality of the processing carried out on the basis of your consent up to the point of
        withdrawal.
      </p>
      <p>
        You have the right to complain to a supervisory authority about the processing of your
        personal data by us.
      </p>
      <p>
        <strong>Provision of your personal data</strong>
      </p>
      <p>
        The provision of your personal data is generally neither required by law nor by contract and
        is not required for the conclusion of a contract. In principle, you are not obliged to
        provide your personal data. If this should nevertheless be the case, we will point this out
        to you separately when collecting your personal data (for example by marking the mandatory
        fields on input forms).
      </p>
      <p>
        Failure to provide your personal data regularly means that we do not process your personal
        data for one of the purposes described below and you cannot take advantage of an offer
        related to the respective processing (example: If you do not provide your email address, you
        will not receive our newsletter).
      </p>
      <p>
        <strong>Web hosting</strong>
      </p>
      <p>
        We use external services for web hosting. These services can have access to personal data
        that is processed when using our online offer. Further information on the services used, the
        scope of data processing and the technologies and procedures when using the respective
        services can be found in the additional information about the services we use at the end of
        this passage and under the links provided there.
      </p>
      <p>
        <u>
          Amazon Web Services
          <br />
        </u>
        Provider: Amazon Web Services, Inc., United States of America.
        <br />
        Website: <a href="https://aws.amazon.com/">https://aws.amazon.com</a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://aws.amazon.com/de/legal/">https://aws.amazon.com/de/legal/</a>
        <br />
        Guarantee: EU standard contractual clauses. You can request a copy of the EU standard
        contractual clauses from us.
      </p>
      <p>
        <strong>Web server log files</strong>
      </p>
      <p>
        We process your personal data in order to be able to display our online offer to you and to
        guarantee the stability and security of our online offer. Information (e.g., requested
        element, called URL, operating system, date and time of request, browser type and version
        used, IP address, protocol used, amount of data transferred, user agent, referrer URL, time
        zone difference to Greenwich Mean Time (GMT) and / or HTTP status code) are stored in
        so-called log files (access log, error log, etc.).
      </p>
      <p>
        If we have asked for your consent and you have given it, the legal basis for processing is
        Article 6 (1) (a) GDPR. If we have not asked for your consent, the legal basis for
        processing is Article 6 (1) (f) GDPR. Our legitimate interest is the proper display of our
        online offer and the guarantee of the stability and security of our online offer.
      </p>
      <p>
        <strong>Security</strong>
      </p>
      <p>
        For security reasons and to protect the transmission of your personal data and other
        confidential content, we use encryption on our domain. You can recognize this in the browser
        line by the character string "https: //" and the lock symbol.
      </p>
      <p>
        <strong>Content Delivery Networks</strong>
      </p>
      <p>
        We use content delivery networks from external services to optimize the loading time,
        stability and security of our online offer.
      </p>
      <p>
        If we have asked for your consent and you have given it, the legal basis for processing is
        Article 6 (1) (a) GDPR. If we have not asked for your consent, the legal basis for
        processing is Article 6 (1) (f) GDPR. Our legitimate interest is the optimization of the
        loading time, stability and security of our online offer.
      </p>
      <p>
        When using external services, profiling (for advertising purposes, personalized information,
        etc.) can also occur. Profiling can also be done across services and devices. Further
        information on the services used, the scope of data processing and the technologies and
        procedures when using the respective services as well as whether profiling takes place when
        using the respective services and, if applicable, information about the logic involved and
        the scope and intended effects of a Such processing for you can be found in the further
        information about the services we use at the end of this passage and under the links
        provided there.
      </p>
      <p>
        <u>
          Amazon CloudFront
          <br />
        </u>
        Provider: Amazon Web Services, Inc., United States of America.
        <br />
        Website:{' '}
        <a href="https://aws.amazon.com/de/cloudfront/">https://aws.amazon.com/de/cloudfront/</a>
        <br />
        Further information &amp; data protection:
        <a href="https://aws.amazon.com/de/legal/"> https://aws.amazon.com/de/legal/</a>
        <br />
        Guarantee: EU standard contractual clauses. You can request a copy of the EU standard
        contractual clauses from us.
      </p>
      <p>
        <strong>Contact</strong>
      </p>
      <p>
        If you contact us, we will process your personal data in order to process your contacting
        us.
      </p>
      <p>
        If we have asked for your consent and you have given it, the legal basis for processing is
        Article 6 (1) (a) GDPR. If we have not asked for your consent, the legal basis for
        processing is Article 6 (1) (f) GDPR. Our legitimate interest is to process your contact. If
        processing is necessary to fulfill a contract with you or to carry out pre-contractual
        measures based on your request, the legal basis for processing is also Article 6 (1) (b)
        GDPR.
      </p>
      <p>
        We use external services to provide and maintain our email accounts. These services can have
        access to personal data that is processed when you contact us. Further information on the
        services used, the scope of data processing and the technologies and procedures when using
        the respective services can be found below in the additional information about the services
        we use and under the links provided there:
      </p>
      <p>
        <u>
          Microsoft Exchange
          <br />
        </u>
        Provider: Microsoft Corporation, United States of America.
        <br />
        Website:{' '}
        <a href="https://www.microsoft.com/de-de/microsoft-365/exchange/email">
          https://www.microsoft.com/de-de/microsoft-365/exchange/email
        </a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://privacy.microsoft.com/de-de/">
          {' '}
          https://privacy.microsoft.com/de-de/
        </a> and{' '}
        <a href="https://www.microsoft.com/de-de/trust-center/privacy">
          https://www.microsoft.com/de-de/trust-center/privacy
        </a>
        <br />
        Guarantee: EU standard contractual clauses. You can request a copy of the EU standard
        contractual clauses from us.
      </p>
      <p>
        To support the processing of your contact, we use support systems (appointment booking
        systems, live chats, ticket systems or help desks, etc.) and use external services for this.
        These services can have access to personal data that is processed when you contact us via a
        support system. Further information on the services used, the scope of data processing and
        the technologies and procedures when using the respective services can be found below in the
        additional information about the services we use and under the links provided there:
      </p>
      <p>
        <u>
          Freshchat
          <br />
        </u>
        Provider: Freshworks, Inc., United States of America.
        <br />
        Website:{' '}
        <a href="https://www.freshworks.com/live-chat-software/">
          https://www.freshworks.com/live-chat-software/
        </a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://www.freshworks.com/privacy/">
          https://www.freshworks.com/privacy/
        </a> and{' '}
        <a href="https://www.freshworks.com/security/">https://www.freshworks.com/security/</a>
        <br />
        Guarantee: EU standard contractual clauses. You can request a copy of the EU standard
        contractual clauses from us.
      </p>
      <p>
        <u>
          Freshdesk
          <br />
        </u>
        Provider: Freshworks, Inc., United States of America.
        <br />
        Website: <a href="https://freshdesk.com/de/"> https://freshdesk.com/de/</a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://www.freshworks.com/de/datenschutz/">
          https://www.freshworks.com/de/datenschutz/
        </a>{' '}
        and
        <a href="https://www.freshworks.com/de/sicherheit/">
          {' '}
          https://www.freshworks.com/de/sicherheit/
        </a>
        <br />
        Guarantee: EU standard contractual clauses. You can request a copy of the EU standard
        contractual clauses from us.
      </p>
      <p>
        <strong>Cookies &amp; Similar Technologies</strong>
      </p>
      <p>
        Cookies are used. Cookies are text information that is stored on your device. A distinction
        is made between session cookies, which are deleted immediately after you close your browser,
        and permanent cookies, which are only deleted after a certain period of time.
      </p>
      <p>
        In addition to cookies, similar technologies (tracking pixels, web beacons, etc.) can also
        be used. The following statements on cookies also apply to similar technologies. These
        statements also apply to further processing in connection with cookies and similar
        technologies (analysis &amp; marketing, etc.). This also applies in particular to any
        consent you may have given for the use of cookies. This also extends to other technologies
        and to further processing in connection with cookies and similar technologies.
      </p>
      <p>
        Cookies can serve to enable the use of certain functions. Cookies can also be used to
        measure the range of our online offer, to design it according to needs and interests, and
        thus to optimize our online offer and our marketing. Cookies can be used by us and by
        external services.
      </p>
      <p>
        If we have asked for your consent and you have given it, the legal basis for processing is
        Article 6 (1) (a) GDPR. If we have not asked for your consent, the legal basis for
        processing is Article 6 (1) (f) GDPR. Depending on the purpose of the processing, our
        legitimate interests can be found in the following passages.
      </p>
      <p>
        You can prevent the storage of cookies by setting your browser accordingly. Below we provide
        you with links for typical browsers, under which you can find further information on the
        management of cookie settings:
        <br />- Firefox:{' '}
        <a href="https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen">
          https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen
        </a>
        <br />- Chrome:{' '}
        <a href="https://support.google.com/chrome/bin/answer.py?hl=de&amp;hlrm=en&amp;answer=95647">
          https://support.google.com/chrome/bin/answer.py?hl=de&amp;hlrm=en&amp;answer=95647
        </a>
        <br />- Internet Explorer / Edge:{' '}
        <a href="https://windows.microsoft.com/de-DE/windows-vista/Block-or-allow-cookies">
          https://windows.microsoft.com/de-DE/windows-vista/Block-or-allow-cookies
        </a>
        <br />- Safari:{' '}
        <a href="https://support.apple.com/en-us/guide/safari/sfri11471/mac">
          https://support.apple.com/en-us/guide/safari/sfri11471/mac
        </a>
        <br />- Opera:{' '}
        <a href="https://help.opera.com/de/latest/web-preferences/#cookies">
          https://help.opera.com/de/latest/web-preferences/#cookies
        </a>
        <br />- Yandex:{' '}
        <a href="https://browser.yandex.com/help/personal-data-protection/cookies.html">
          https://browser.yandex.com/help/personal-data-protection/cookies.html
        </a>
      </p>
      <p>
        You can find further possibilities of objection under the following links:{' '}
        <a href="https://www.youronlinechoices.eu/">https://www.youronlinechoices.eu/</a>,{' '}
        <a href="https://youradchoices.ca/en/tools">https://youradchoices.ca/en/tools</a>,{' '}
        <a href="https://optout.aboutads.info">https://optout.aboutads.info</a> and{' '}
        <a href="https://optout.networkadvertising.org/?c=1">
          https://optout.networkadvertising.org/?c=1
        </a>
        .
      </p>
      <p>
        If you prevent the storage of cookies, this can impair the proper functioning of our online
        offer. If you delete all cookies, the above settings will also be lost and will have to be
        made again.
      </p>
      <p>
        You can also activate the “Do-Not-Track” function of your browser to indicate that you do
        not want to be tracked. Below we provide links for typical browsers under which you can find
        further information on the "Do-Not-Track" setting:
        <br />- Firefox:{' '}
        <a href="https://support.mozilla.org/de/kb/wie-verhindere-ich-dass-websites-mich-verfollow">
          https://support.mozilla.org/de/kb/wie-verhindere-ich-dass-websites-mich-verfollow
        </a>
        <br />- Chrome:{' '}
        <a href="https://support.google.com/chrome/answer/2790761?co=GENIE.Platform%3DDesktop&amp;hl=de">
          https://support.google.com/chrome/answer/2790761?co=GENIE.Platform%3DDesktop&amp;hl=de
        </a>
        <br />- Internet Explorer / Edge:{' '}
        <a href="https://support.microsoft.com/de-de/help/17288/windows-internet-explorer-11-use-do-not-track">
          https://support.microsoft.com/de-de/help/17288/windows-internet-explorer-11-use-do-not-track
        </a>
        <br />
        - Opera: https://help.opera.com/de/latest/security-and-privacy/
        <br />- As of February 2019, Safari no longer supports the "Do-Not-Track" function.
        Cross-website tracking can be prevented in Safari using the following link:{' '}
        <a href="https://support.apple.com/de-de/guide/safari/sfri40732/12.0/mac">
          https://support.apple.com/de-de/guide/safari/sfri40732/12.0/mac
        </a>
        <br />- Yandex:{' '}
        <a href="https://browser.yandex.com/help/personal-data-protection/do-not-follow.html">
          https://browser.yandex.com/help/personal-data-protection/do-not-follow.html
        </a>
      </p>
      <p>
        <strong>Newsletter</strong>
      </p>
      <p>
        If we have asked for your consent and you have given it, we will process your e-mail address
        in order to conduct e-mail marketing and, if necessary, other personal data in order to
        address you personally. The legal basis for processing is Article 6 (1) (a) GDPR. The
        content of e-mail marketing will be specifically described when you obtain your consent.
        Incidentally, e-mail marketing contains information about us, our goods and services.
      </p>
      <p>
        We use the so-called double opt-in procedure to prevent possible misuse of your personal
        data. For this purpose, after collecting your e-mail address, we will send you an e-mail to
        the e-mail address you provided, in which we ask you to confirm that you actually want the
        e-mail marketing. The legal basis for processing is Article 6 (1) (f) GDPR. Our legitimate
        interest is the legally compliant implementation of email marketing.
      </p>
      <p>
        We log the time you gave your consent and the time of your confirmation as well as your IP
        address and the content of your declaration of consent in order to be able to prove that
        your consent was obtained in accordance with the law. The legal basis for processing is
        Article 6 (1) (f) GDPR. Our legitimate interest is the legally compliant implementation of
        email marketing.
      </p>
      <p>
        We use external services for email marketing. Further information on the services used, the
        scope of data processing and the technologies and procedures when using the respective
        services as well as whether profiling takes place when using the respective services and, if
        applicable, information about the logic involved and the scope and intended effects of a
        Such processing for you can be found in the further information about the services we use at
        the end of this passage and under the links provided there.
      </p>
      <p>
        You can withdraw your consent at any time. Withdrawing your consent does not affect the
        legality of the processing carried out on the basis of your consent up to the point of
        withdrawal. To revoke your consent, you can use the link provided in the e-mails or contact
        us using the contact details given above.
      </p>
      <p>
        If you have withdrawn your consent, we reserve the right to process your personal data in a
        so-called blacklist / block list in order to be able to ensure in future that no further
        email marketing takes place in connection with this personal data. The legal basis for
        processing is Article 6 (1) (f) GDPR. Our legitimate interest is to avoid unwanted email
        marketing.
      </p>
      <p>
        We process your personal data within the scope of tracking or success measurements in order
        to measure the reach of our email marketing, to design it according to your needs and
        interests, and thus to optimize our email marketing. Profiling (for purposes of advertising,
        personalized information, etc.) can also be used. Profiling can also be done across services
        and devices. If we have asked for your consent and you have given it, the legal basis for
        processing is Article 6 (1) (a) GDPR. If we have not asked for your consent, the legal basis
        for processing is Article 6 (1) (f) GDPR. Our legitimate interest is the optimization of our
        email marketing. A separate revocation of your consent or objection with regard to the
        tracking or the success measurements is unfortunately not possible. You must use the above
        options to revoke your consent or to object to the processing of your personal data for the
        purpose of e-mail marketing.
      </p>
      <p>
        <u>
          Mailchimp
          <br />
        </u>
        Provider: The Rocket Science Group, LLC, United States of America.
        <br />
        Website: <a href="https://mailchimp.com/de/"> https://mailchimp.com/de/</a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://mailchimp.com/legal/"> https://mailchimp.com/legal/</a>
        <br />
        Guarantee: EU standard contractual clauses. You can request a copy of the EU standard
        contractual clauses from us.
      </p>
      <p>
        <strong>Analysis &amp; Marketing</strong>
      </p>
      <p>
        We process your personal data in order to measure the reach of our online offer, to design
        it according to your needs and interests, and thus to optimize our online offer and our
        marketing.
      </p>
      <p>
        If we have asked for your consent and you have given it, the legal basis for processing is
        Article 6 (1) (a) GDPR. If we have not asked for your consent, the legal basis for
        processing is Article 6 (1) (f) GDPR. Our legitimate interest is the optimization of our
        online offer and our marketing.
      </p>
      <p>
        We use external services for analysis and marketing. Profiling (for purposes of advertising,
        personalized information, etc.) can also be used. Profiling can also be done across services
        and devices. Further information on the services used, the scope of data processing and the
        technologies and procedures when using the respective services as well as whether profiling
        takes place when using the respective services and, if applicable, information about the
        logic involved and the scope and intended effects of a Such processing for you can be found
        in the further information about the services we use at the end of this passage and under
        the links provided there.
      </p>
      <p>
        You can prevent the storage of cookies by setting your browser accordingly. Below we provide
        you with links for typical browsers, under which you can find further information on the
        management of cookie settings:
        <br />- Firefox:{' '}
        <a href="https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen">
          https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen
        </a>
        <br />- Chrome:{' '}
        <a href="https://support.google.com/chrome/bin/answer.py?hl=de&amp;hlrm=en&amp;answer=95647">
          https://support.google.com/chrome/bin/answer.py?hl=de&amp;hlrm=en&amp;answer=95647
        </a>
        <br />- Internet Explorer / Edge:{' '}
        <a href="https://windows.microsoft.com/de-DE/windows-vista/Block-or-allow-cookies">
          https://windows.microsoft.com/de-DE/windows-vista/Block-or-allow-cookies
        </a>
        <br />- Safari:{' '}
        <a href="https://support.apple.com/en-us/guide/safari/sfri11471/mac">
          https://support.apple.com/en-us/guide/safari/sfri11471/mac
        </a>
        <br />- Opera:{' '}
        <a href="https://help.opera.com/de/latest/web-preferences/#cookies">
          https://help.opera.com/de/latest/web-preferences/#cookies
        </a>
        <br />- Yandex:{' '}
        <a href="https://browser.yandex.com/help/personal-data-protection/cookies.html">
          https://browser.yandex.com/help/personal-data-protection/cookies.html
        </a>
      </p>
      <p>
        You can find further possibilities of objection under the following links:{' '}
        <a href="https://www.youronlinechoices.eu/">https://www.youronlinechoices.eu/</a>,{' '}
        <a href="https://youradchoices.ca/en/tools">https://youradchoices.ca/en/tools</a>,{' '}
        <a href="https://optout.aboutads.info">https://optout.aboutads.info</a> and{' '}
        <a href="https://optout.networkadvertising.org/?c=1">
          https://optout.networkadvertising.org/?c=1
        </a>
        .
      </p>
      <p>
        If you prevent the storage of cookies, this can impair the proper functioning of our online
        offer. If you delete all cookies, the above settings will also be lost and will have to be
        made again.
      </p>
      <p>
        You can also activate the “Do-Not-Track” function of your browser to indicate that you do
        not want to be tracked. Below we provide links for typical browsers under which you can find
        further information on the "Do-Not-Track" setting:
        <br />- Firefox:{' '}
        <a href="https://support.mozilla.org/de/kb/wie-verhindere-ich-dass-websites-mich-verfollow">
          https://support.mozilla.org/de/kb/wie-verhindere-ich-dass-websites-mich-verfollow
        </a>
        <br />- Chrome:{' '}
        <a href="https://support.google.com/chrome/answer/2790761?co=GENIE.Platform%3DDesktop&amp;hl=de">
          https://support.google.com/chrome/answer/2790761?co=GENIE.Platform%3DDesktop&amp;hl=de
        </a>
        <br />- Internet Explorer / Edge:{' '}
        <a href="https://support.microsoft.com/de-de/help/17288/windows-internet-explorer-11-use-do-not-track">
          https://support.microsoft.com/de-de/help/17288/windows-internet-explorer-11-use-do-not-track
        </a>
        <br />
        - Opera: https://help.opera.com/de/latest/security-and-privacy/
        <br />- As of February 2019, Safari no longer supports the "Do-Not-Track" function.
        Cross-website tracking can be prevented in Safari using the following link:{' '}
        <a href="https://support.apple.com/de-de/guide/safari/sfri40732/12.0/mac">
          https://support.apple.com/de-de/guide/safari/sfri40732/12.0/mac
        </a>
        <br />- Yandex:{' '}
        <a href="https://browser.yandex.com/help/personal-data-protection/do-not-follow.html">
          https://browser.yandex.com/help/personal-data-protection/do-not-follow.html
        </a>
      </p>
      <p>
        <u>
          Facebook pixel with custom audiences and extended data comparison
          <br />
        </u>
        Provider: Facebook Ireland Limited, Ireland. Facebook Ireland Limited is a subsidiary of
        Facebook, Inc., United States of America.
        <br />
        Website:{' '}
        <a href="https://www.facebook.com/business/help/744354708981227?id=2469097953376494">
          https://www.facebook.com/business/help/744354708981227?id=2469097953376494
        </a>
        <br />
        More Information &amp; Privacy:{' '}
        <a href="https://www.facebook.com/business/help/742478679120153?id=1205376682832142&amp;recommended_by=218844828315224">
          https://www.facebook.com/business/help/742478679120153?id=1205376682832142&amp;recommended_by=218844828315224
        </a>
        ,{' '}
        <a href="https://www.facebook.com/business/help/1474662202748341?id=2469097953376494&amp;locale=de_DE">
          https://www.facebook.com/business/help/1474662202748341?id=2469097953376494&amp;locale=de_DE
        </a>
        ,{' '}
        <a href="https : //de-de.facebook.com/business/help/611774685654668">
          https : //de-de.facebook.com/business/help/611774685654668
        </a>
        ,{' '}
        <a href="https://de-de.facebook.com/privacy/explanation">
          https://de-de.facebook.com/privacy/explanation
        </a>
        ,{' '}
        <a href="https://de-de.facebook.com/policies/cookies/">
          https://de-de.facebook.com/policies/cookies/
        </a>
        ,{' '}
        <a href="https://www.facebook.com/help/566994660333381?ref=dp">
          https://www.facebook.com/help/566994660333381?ref=dp
        </a>{' '}
        and
        <a href="https://de-de.facebook.com/help/568137493302217">
          https://de-de.facebook.com/help/568137493302217
        </a>
      </p>
      <p>
        <u>
          Google Ads conversion tracking
          <br />
        </u>
        Provider: In the European Economic Area (EEA) and Switzerland, Google services are offered
        by Google Ireland Limited, Ireland. Google Ireland Limited is a subsidiary of Google LLC,
        United States of America.
        <br />
        Website:{' '}
        <a href="https://ads.google.com/intl/de_de/home/">
          https://ads.google.com/intl/de_de/home/
        </a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        The transmission of personal data to third countries takes place depending on the respective
        Google service and under the application of the various EU standard contractual clauses,
        provided that these are offered by Google. Further information on this and the
        responsibility of Google can be found under the following link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>. You
        can view a copy of the EU standard contractual clauses there.
      </p>
      <p>
        <u>
          Google AdSense
          <br />
        </u>
        Provider: In the European Economic Area (EEA) and Switzerland, Google services are offered
        by Google Ireland Limited, Ireland. Google Ireland Limited is a subsidiary of Google LLC,
        United States of America.
        <br />
        Website:{' '}
        <a href="https://www.google.com/intl/de_de/adsense/start/">
          https://www.google.com/intl/de_de/adsense/start/
        </a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        The transmission of personal data to third countries takes place depending on the respective
        Google service and under the application of the various EU standard contractual clauses,
        provided that these are offered by Google. Further information on this and the
        responsibility of Google can be found under the following link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>. You
        can view a copy of the EU standard contractual clauses there.
      </p>
      <p>
        <u>
          Google Analytics
          <br />
        </u>
        Provider: In the European Economic Area (EEA) and Switzerland, Google services are offered
        by Google Ireland Limited, Ireland. Google Ireland Limited is a subsidiary of Google LLC,
        United States of America.
        <br />
        Website:{' '}
        <a href="https://marketingplatform.google.com/intl/de/about/analytics/">
          https://marketingplatform.google.com/intl/de/about/analytics/
        </a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://support.google.com/analytics/answer/6004245?hl=de">
          https://support.google.com/analytics/answer/6004245?hl=de
        </a>{' '}
        and <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        The transmission of personal data to third countries takes place depending on the respective
        Google service and under the application of the various EU standard contractual clauses,
        provided that these are offered by Google. Further information on this and the
        responsibility of Google can be found under the following link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>. You
        can view a copy of the EU standard contractual clauses there.
      </p>
      <p>
        <u>
          Google Analytics 360
          <br />
        </u>
        Provider: In the European Economic Area (EEA) and Switzerland, Google services are offered
        by Google Ireland Limited, Gordon House, Ireland. Google Ireland Limited is a subsidiary of
        Google LLC, United States of America.
        <br />
        Website:{' '}
        <a href="https://marketingplatform.google.com/about/analytics-360/">
          https://marketingplatform.google.com/about/analytics-360/
        </a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://support.google.com/analytics/answer/6004245?hl=de">
          https://support.google.com/analytics/answer/6004245?hl=de
        </a>{' '}
        and <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        The transmission of personal data to third countries takes place depending on the respective
        Google service and under the application of the various EU standard contractual clauses,
        provided that these are offered by Google. Further information on this and the
        responsibility of Google can be found under the following link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>. You
        can view a copy of the EU standard contractual clauses there.
      </p>
      <p>
        <u>
          Google Optimize
          <br />
        </u>
        Provider: In the European Economic Area (EEA) and Switzerland, Google services are offered
        by Google Ireland Limited, Ireland. Google Ireland Limited is a subsidiary of Google LLC,
        United States of America.
        <br />
        Website:{' '}
        <a href="https://marketingplatform.google.com/intl/de/about/optimize/">
          https://marketingplatform.google.com/intl/de/about/optimize/
        </a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://support.google.com/analytics/answer/6004245?hl=de">
          https://support.google.com/analytics/answer/6004245?hl=de
        </a>{' '}
        and <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        The transmission of personal data to third countries takes place depending on the respective
        Google service and under the application of the various EU standard contractual clauses,
        provided that these are offered by Google. Further information on this and the
        responsibility of Google can be found under the following link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>. You
        can view a copy of the EU standard contractual clauses there.
      </p>
      <p>
        <u>
          Google remarketing
          <br />
        </u>
        Provider: In the European Economic Area (EEA) and Switzerland, Google services are offered
        by Google Ireland Limited, Ireland. Google Ireland Limited is a subsidiary of Google LLC,
        United States of America.
        <br />
        Website:{' '}
        <a href="https://support.google.com/google-ads/answer/2453998">
          https://support.google.com/google-ads/answer/2453998
        </a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        The transmission of personal data to third countries takes place depending on the respective
        Google service and under the application of the various EU standard contractual clauses,
        provided that these are offered by Google. Further information on this and the
        responsibility of Google can be found under the following link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>. You
        can view a copy of the EU standard contractual clauses there.
      </p>
      <p>
        <u>
          Google Search Ads 360
          <br />
        </u>
        Provider: In the European Economic Area (EEA) and Switzerland, Google services are offered
        by Google Ireland Limited, Ireland. Google Ireland Limited is a subsidiary of Google LLC,
        United States of America.
        <br />
        Website:{' '}
        <a href="https://marketingplatform.google.com/intl/de/about/search-ads-360/">
          https://marketingplatform.google.com/intl/de/about/search-ads-360/
        </a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        The transmission of personal data to third countries takes place depending on the respective
        Google service and under the application of the various EU standard contractual clauses,
        provided that these are offered by Google. Further information on this and the
        responsibility of Google can be found under the following link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>. You
        can view a copy of the EU standard contractual clauses there.
      </p>
      <p>
        <u>
          Google Signals
          <br />
        </u>
        Provider: In the European Economic Area (EEA) and Switzerland, Google services are offered
        by Google Ireland Limited, Ireland. Google Ireland Limited is a subsidiary of Google LLC,
        United States of America.
        <br />
        Website:{' '}
        <a href="https://support.google.com/analytics/answer/7532985?hl=de">
          https://support.google.com/analytics/answer/7532985?hl=de
        </a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://support.google.com/analytics/answer/6004245?hl=de">
          https://support.google.com/analytics/answer/6004245?hl=de
        </a>{' '}
        and <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        The transmission of personal data to third countries takes place depending on the respective
        Google service and under the application of the various EU standard contractual clauses,
        provided that these are offered by Google. Further information on this and the
        responsibility of Google can be found under the following link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>. You
        can view a copy of the EU standard contractual clauses there.
      </p>
      <p>
        <u>
          Google Tag Manager
          <br />
        </u>
        Provider: In the European Economic Area (EEA) and Switzerland, Google services are offered
        by Google Ireland Limited, Ireland. Google Ireland Limited is a subsidiary of Google LLC,
        United States of America.
        <br />
        Website:{' '}
        <a href="https://support.google.com/tagmanager/answer/6102821?hl=de">
          https://support.google.com/tagmanager/answer/6102821?hl=de
        </a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        The transmission of personal data to third countries takes place depending on the respective
        Google service and under the application of the various EU standard contractual clauses,
        provided that these are offered by Google. Further information on this and the
        responsibility of Google can be found under the following link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>. You
        can view a copy of the EU standard contractual clauses there.
      </p>
      <p>
        <u>
          Google Universal Analytics
          <br />
        </u>
        Provider: In the European Economic Area (EEA) and Switzerland, Google services are offered
        by Google Ireland Limited, Ireland. Google Ireland Limited is a subsidiary of Google LLC,
        United States of America.
        <br />
        Website:{' '}
        <a href="https://support.google.com/analytics/answer/2790010?hl=de">
          https://support.google.com/analytics/answer/2790010?hl=de
        </a>
        <br />
        Further information &amp; data protection:
        <br />{' '}
        <a href="https://support.google.com/analytics/answer/6004245?hl=de">
          https://support.google.com/analytics/answer/6004245?hl=de
        </a>{' '}
        and <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        The transmission of personal data to third countries takes place depending on the respective
        Google service and under the application of the various EU standard contractual clauses,
        provided that these are offered by Google. Further information on this and the
        responsibility of Google can be found under the following link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>. You
        can view a copy of the EU standard contractual clauses there.
      </p>
      <p>
        <u>
          Hotjar
          <br />
        </u>
        Provider: Hotjar Limited, Malta.
        <br />
        Website: <a href="https://www.hotjar.com/">https://www.hotjar.com/</a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://www.hotjar.com/legal/policies/privacy/">
          https://www.hotjar.com/legal/policies/privacy/
        </a>
      </p>
      <p>
        <u>
          Mailchimp
          <br />
        </u>
        Provider: The Rocket Science Group, LLC, United States of America.
        <br />
        Website: <a href="https://mailchimp.com/de/">https://mailchimp.com/de/</a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://mailchimp.com/legal/">https://mailchimp.com/legal/</a>
        <br />
        Guarantee: EU standard contractual clauses. You can request a copy of the EU standard
        contractual clauses from us.
      </p>
      <p>
        <strong>Social media presences</strong>
      </p>
      <p>
        We maintain social media presences with external services in order to be able to communicate
        with users there and thus to optimize our online offer and our marketing.
      </p>
      <p>
        This data protection declaration also applies to the following social media presences:
        <br /> <a href="https://www.facebook.com/test">https://www.facebook.com/test</a>
      </p>
      <p>
        If we have asked for your consent and you have given it, the legal basis for processing is
        Article 6 (1) (a) GDPR. If we have not asked for your consent, the legal basis for
        processing is Article 6 (1) (f) GDPR. Our legitimate interest is the optimization of our
        online offer and our marketing.
      </p>
      <p>
        When using external services, profiling (for advertising purposes, personalized information,
        etc.) can also occur. Profiling can also be done across services and devices. Further
        information on the services used, the scope of data processing and the technologies and
        procedures when using the respective services as well as whether profiling takes place when
        using the respective services and, if applicable, information about the logic involved and
        the scope and intended effects of a Such processing for you can be found in the further
        information about the services we use at the end of this passage and under the links
        provided there.
      </p>
      <p>
        <u>
          Facebook
          <br />
        </u>
        Provider: Facebook Ireland Limited, Ireland. Facebook Ireland Limited is a subsidiary of
        Facebook, Inc., United States of America.
        <br />
        Website: <a href="https://www.facebook.com/">https://www.facebook.com</a>
        <br />
        The provider and we are jointly responsible. We have concluded a corresponding agreement
        with the provider. You can request a copy of the agreement from us.
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://developers.facebook.com/docs/plugins/">
          https://developers.facebook.com/docs/plugins/
        </a>
        ,{' '}
        <a href="https://www.facebook.com/legal/terms/information_about_page_insights_data">
          https://www.facebook.com/legal/terms/information_about_page_insights_data
        </a>
        , <a href="https://de-de.facebook.com/privacy/">https://de-de.facebook.com/privacy/</a>{' '}
        explanation,{' '}
        <a href="https://de-de.facebook.com/policies/cookies/">
          https://de-de.facebook.com/policies/cookies/
        </a>
        ,{' '}
        <a href="https://www.facebook.com/help/566994660333381?ref=dp">
          https://www.facebook.com/help/566994660333381?ref=dp
        </a>{' '}
        and{' '}
        <a href="https://de-de.facebook.com/help/568137493302217">
          https://de-de.facebook.com/help/568137493302217
        </a>
      </p>
      <p>
        <u>
          Instagram
          <br />
        </u>
        Provider: Facebook Ireland Limited, Ireland. Facebook Ireland Limited is a subsidiary of
        Facebook, Inc., United States of America.
        <br />
        Website: <a href="https://www.instagram.com/">https://www.instagram.com</a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://help.instagram.com/581066165581870">
          https://help.instagram.com/581066165581870
        </a>{' '}
        and{' '}
        <a href="https://help.instagram.com/519522125107875">
          https://help.instagram.com/519522125107875
        </a>
      </p>
      <p>
        <u>
          LinkedIn
          <br />
        </u>
        Provider: If you are in the EU, the European Economic Area (EEA) or Switzerland, this
        service is offered by LinkedIn Ireland Unlimited Company, Ireland. If you are outside the
        EU, the European Economic Area (EEA) or Switzerland, this service is offered by LinkedIn
        Corporation, United States of America.
        <br />
        Website: <a href="https://www.linkedin.com/">https://www.linkedin.com</a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://de.linkedin.com/legal/privacy-policy?trk=homepage-basic_footer-privacy-policy">
          https://de.linkedin.com/legal/privacy-policy?trk=homepage-basic_footer-privacy-policy
        </a>{' '}
        and{' '}
        <a href="https://de.linkedin.com/legal/cookie-policy?trk=homepage-basic_footer-cookie-policy">
          https://de.linkedin.com/legal/cookie-policy?trk=homepage-basic_footer-cookie-policy
        </a>
        <br />
        Guarantee: EU standard contractual clauses. You can request a copy of the EU standard
        contractual clauses from us.
      </p>
      <p>
        <u>
          TikTok
          <br />
        </u>
        Provider: For users in the EEA and Switzerland, the service provider is TikTok Technology
        Limited, Ireland. For users in the UK, the service provider is TikTok Information
        Technologies UK Limited, United Kingdom. Incidentally, the service provider is TikTok Inc.,
        United States of America.
        <br />
        Website: <a href="https://www.tiktok.com/">https://www.tiktok.com</a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://www.tiktok.com/legal/privacy-policy?lang=de">
          https://www.tiktok.com/legal/privacy-policy?lang=de
        </a>
      </p>
      <p>
        <u>
          YouTube
          <br />
        </u>
        Provider: In the European Economic Area (EEA) and Switzerland, Google services are offered
        by Google Ireland Limited, Ireland. Google Ireland Limited is a subsidiary of Google LLC,
        United States of America.
        <br />
        Website: <a href="https://www.youtube.de/">https://www.youtube.de</a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        The transmission of personal data to third countries takes place depending on the respective
        Google service and under the application of the various EU standard contractual clauses,
        provided that these are offered by Google. Further information on this and the
        responsibility of Google can be found under the following link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>. You
        can view a copy of the EU standard contractual clauses there.
      </p>
      <p>
        <strong>Fonts &amp; Scripts</strong>
      </p>
      <p>
        We use fonts and scripts from external services in order to be able to display our online
        offer to you and to ensure that the fonts and scripts are always up-to-date.
      </p>
      <p>
        If we have asked for your consent and you have given it, the legal basis for processing is
        Article 6 (1) (a) GDPR. If we have not asked for your consent, the legal basis for
        processing is Article 6 (1) (f) GDPR. Our legitimate interest is the proper display of our
        online offer and the guarantee of up-to-date fonts and scripts.
      </p>
      <p>
        When using external services, profiling (for advertising purposes, personalized information,
        etc.) can also occur. Profiling can also be done across services and devices. Further
        information on the services used, the scope of data processing and the technologies and
        procedures when using the respective services as well as whether profiling takes place when
        using the respective services and, if applicable, information about the logic involved and
        the scope and intended effects of a Such processing for you can be found in the further
        information about the services we use at the end of this passage and under the links
        provided there.
      </p>
      <p>
        <strong>Maps</strong>
      </p>
      <p>
        We use maps from external services to make it easier for you to determine our location and
        to enable the use of the other functions of these external services in connection with the
        maps.
      </p>
      <p>
        If we have asked for your consent and you have given it, the legal basis for processing is
        Article 6 (1) (a) GDPR. If we have not asked for your consent, the legal basis for
        processing is Article 6 (1) (f) GDPR. Our legitimate interest is the simplified use of maps.
      </p>
      <p>
        When using external services, profiling (for advertising purposes, personalized information,
        etc.) can also occur. Profiling can also be done across services and devices. Further
        information on the services used, the scope of data processing and the technologies and
        procedures when using the respective services as well as whether profiling takes place when
        using the respective services and, if applicable, information about the logic involved and
        the scope and intended effects of a Such processing for you can be found in the further
        information about the services we use at the end of this passage and under the links
        provided there.
      </p>
      <p>
        <u>
          Google Maps
          <br />
        </u>
        Provider: In the European Economic Area (EEA) and Switzerland, Google services are offered
        by Google Ireland Limited, Ireland. Google Ireland Limited is a subsidiary of Google LLC,
        United States of America.
        <br />
        Website: <a href="https://www.google.de/maps">https://www.google.de/maps</a>
        <br />
        Further information &amp; data protection:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        The transmission of personal data to third countries takes place depending on the respective
        Google service and under the application of the various EU standard contractual clauses,
        provided that these are offered by Google. Further information on this and the
        responsibility of Google can be found under the following link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>. You
        can view a copy of the EU standard contractual clauses there.
      </p>
      <br />
      <p>This data protection declaration was created with the configurator from getLaw.de.</p>
    </Content>
  );
};

export default EnPrivacyPolicy;
