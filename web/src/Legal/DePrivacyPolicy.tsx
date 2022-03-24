import { Content } from 'react-bulma-components';
import { Link } from 'react-router-dom';

import useScrollTop from '../hooks/useScrollTop';
import routes from '../services/routes';

const DePrivacyPolicy: React.FC = () => {
  useScrollTop();

  return (
    <Content>
      <h1 className="title is-1" style={{ marginTop: 30 }}>
        Datenschutzerklärung
      </h1>
      <p>
        Nachfolgend informieren wir Sie über die Verarbeitung Ihrer personenbezogenen Daten im
        Rahmen der Nutzung unseres Online-Angebots.
      </p>
      <p>
        <strong>Verantwortlicher</strong>
      </p>
      <p>
        Den Namen und die Kontaktdaten des Verantwortlichen finden Sie im{' '}
        <Link to={routes.aboutUs} title="Impressum">
          Impressum
        </Link>
        .
      </p>
      <p>
        <strong>Ansprechpartner</strong>
      </p>
      <p>
        Bei Fragen zum Datenschutz wenden Sie sich bitte an die im{' '}
        <Link to={routes.aboutUs} title="Impressum">
          Impressum
        </Link>{' '}
        angegebenen Kontaktdaten.
      </p>
      <p>
        <strong>Speicherdauer</strong>
      </p>
      <p>
        Wir löschen Ihre personenbezogenen Daten grundsätzlich dann, wenn diese für die Zwecke, für
        die sie erhoben oder auf sonstige Weise verarbeitet wurden, nicht mehr notwendig sind.
      </p>
      <p>
        Falls wir Sie um Ihre Einwilligung gebeten und Sie diese erteilt haben, löschen wir Ihre
        personenbezogenen Daten, wenn Sie Ihre Einwilligung widerrufen und es an einer anderweitigen
        Rechtsgrundlage für die Verarbeitung fehlt.
      </p>
      <p>
        Wir löschen Ihre personenbezogenen Daten, wenn Sie Widerspruch gegen die Verarbeitung
        einlegen und keine vorrangigen berechtigten Gründe für die Verarbeitung vorliegen oder Sie
        Widerspruch gegen die Verarbeitung zum Zwecke der Direktwerbung oder eines damit in
        Verbindung stehenden Profiling einlegen.
      </p>
      <p>
        Ist eine Löschung nicht möglich, weil eine Verarbeitung noch zur Erfüllung einer rechtlichen
        Verpflichtung (gesetzliche Aufbewahrungsfristen etc.), der wir unterliegen, oder zur
        Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist, schränken
        wir die Verarbeitung Ihrer personenbezogenen Daten ein.
      </p>
      <p>Weitere Informationen zur Speicherdauer finden Sie auch in den nachfolgenden Passagen.</p>
      <p>
        <strong>Ihre Rechte</strong>
      </p>
      <p>
        Sie haben uns gegenüber folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:
        <br /> - Recht auf Auskunft
        <br /> - Recht auf Berichtigung
        <br /> - Recht auf Löschung
        <br /> - Recht auf Einschränkung der Verarbeitung
        <br /> - Recht auf Widerspruch gegen die Verarbeitung
        <br /> - Recht auf Datenübertragbarkeit
      </p>
      <p>
        <strong>
          {' '}
          Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
          jederzeit gegen die Verarbeitung Ihrer personenbezogenen Daten, die aufgrund von Artikel 6
          Abs. 1 lit. e oder f DS-GVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf
          diese Bestimmungen gestütztes Profiling. Wir verarbeiten Ihre personenbezogenen Daten dann
          nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung
          nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung
          dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen. <br /> Falls
          wir Ihre personenbezogenen Daten verarbeiten, um Direktwerbung zu betreiben, haben Sie das
          Recht, jederzeit Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten zum
          Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit
          solcher Direktwerbung in Verbindung steht. Wir werden Ihre personenbezogenen Daten dann
          nicht mehr für diese Zwecke verarbeiten.{' '}
        </strong>
      </p>
      <p>
        Sie haben das Recht, eine Einwilligung zur Verarbeitung Ihrer personenbezogenen Daten
        jederzeit zu widerrufen, falls Sie uns eine solche Einwilligung erteilt haben. Durch den
        Widerruf der Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum
        Widerruf erfolgten Verarbeitung nicht berührt.
      </p>
      <p>
        Sie haben das Recht, sich bei einer Aufsichtsbehörde über die Verarbeitung Ihrer
        personenbezogenen Daten durch uns zu beschweren.
      </p>
      <p>
        <strong>Bereitstellung Ihrer personenbezogenen Daten</strong>
      </p>
      <p>
        Die Bereitstellung Ihrer personenbezogenen Daten ist grundsätzlich weder gesetzlich noch
        vertraglich vorgeschrieben und nicht für einen Vertragsabschluss erforderlich. Sie sind
        grundsätzlich nicht verpflichtet, Ihre personenbezogenen Daten bereitzustellen. Soweit dies
        dennoch einmal der Fall sein sollte, weisen wir Sie bei Erhebung Ihrer personenbezogenen
        Daten gesondert darauf hin (beispielsweise durch Kennzeichnung der Pflichtfelder bei
        Eingabeformularen).
      </p>
      <p>
        Die Nichtbereitstellung Ihrer personenbezogenen Daten hat regelmäßig zur Folge, dass wir
        Ihre personenbezogenen Daten nicht für einen der nachfolgend beschriebenen Zwecke
        verarbeiten und Sie ein mit der jeweiligen Verarbeitung zusammenhängendes Angebot nicht
        wahrnehmen können (Beispiel: Ohne Bereitstellung Ihrer E-Mail-Adresse erhalten Sie unseren
        Newsletter nicht).
      </p>
      <p>
        <strong>Webhosting</strong>
      </p>
      <p>
        Zum Webhosting setzen wir externe Dienste ein. Diese Dienste können Zugriff auf
        personenbezogene Daten haben, die im Rahmen der Nutzung unseres Online-Angebots verarbeitet
        werden. Weitere Informationen zu den eingesetzten Diensten, zum Umfang der Datenverarbeitung
        und zu den Technologien und Verfahren beim Einsatz der jeweiligen Dienste finden Sie in den
        weiterführenden Informationen über die von uns eingesetzten Dienste am Ende dieser Passage
        und unter den dort bereitgestellten Links.
      </p>
      <p>
        <u>Amazon Web Services</u>
        <br /> Anbieter: Amazon Web Services, Inc., Vereinigte Staaten von Amerika.
        <br /> Website: <a href="https://aws.amazon.com">https://aws.amazon.com</a>
        <br /> Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://aws.amazon.com/de/legal/">https://aws.amazon.com/de/legal/</a>
        <br /> Garantie: EU-Standardvertragsklauseln. Eine Kopie der EU-Standardvertragsklauseln
        können Sie bei uns anfordern.
      </p>
      <p>
        <strong>Webserver-Logfiles</strong>
      </p>
      <p>
        Wir verarbeiten Ihre personenbezogenen Daten, um Ihnen unser Online-Angebot anzeigen zu
        können und die Stabilität und Sicherheit unseres Online-Angebots zu gewährleisten. Dabei
        werden Informationen (beispielsweise angefragtes Element, aufgerufene URL, Betriebssystem,
        Datum und Uhrzeit der Anfrage, Browsertyp und die verwendete Version, IP-Adresse,
        verwendetes Protokoll, übertragene Datenmenge, User Agent, Referrer URL, Zeitzonendifferenz
        zur Greenwich Mean Time (GMT) und/oder HTTP-Statuscode) in sogenannten Logfiles (Access-Log,
        Error-Log etc.) gespeichert.
      </p>
      <p>
        Falls wir Sie um Ihre Einwilligung gebeten und Sie diese erteilt haben, ist die
        Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. a DS-GVO. Falls wir Sie nicht um
        Ihre Einwilligung gebeten haben, ist die Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1
        lit. f DS-GVO. Unser berechtigtes Interesse ist dabei die ordnungsgemäße Anzeige unseres
        Online-Angebots und die Gewährleistung der Stabilität und Sicherheit unseres
        Online-Angebots.
      </p>
      <p>
        <strong>Sicherheit</strong>
      </p>
      <p>
        Aus Sicherheitsgründen und zum Schutz der Übertragung Ihrer personenbezogenen Daten und
        anderer vertraulicher Inhalte setzen wir auf unserer Domain eine Verschlüsselung ein. Dies
        können Sie in der Browserzeile an der Zeichenfolge „https://“ und dem Schloss-Symbol
        erkennen.
      </p>
      <p>
        <strong>Content Delivery Networks</strong>
      </p>
      <p>
        Wir nutzen Content Delivery Networks von externen Diensten, um die Ladezeit, Stabilität und
        Sicherheit unseres Online-Angebots zu optimieren.
      </p>
      <p>
        Falls wir Sie um Ihre Einwilligung gebeten und Sie diese erteilt haben, ist die
        Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. a DS-GVO. Falls wir Sie nicht um
        Ihre Einwilligung gebeten haben, ist die Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1
        lit. f DS-GVO. Unser berechtigtes Interesse ist dabei die Optimierung der Ladezeit,
        Stabilität und Sicherheit unseres Online-Angebots.
      </p>
      <p>
        Im Rahmen der Nutzung der externen Dienste kann es auch zum Profiling (zu Zwecken der
        Werbung, personalisierten Information etc.) kommen. Das Profiling kann auch dienst- und
        geräteübergreifend erfolgen. Weitere Informationen zu den eingesetzten Diensten, zum Umfang
        der Datenverarbeitung und zu den Technologien und Verfahren beim Einsatz der jeweiligen
        Dienste sowie dazu, ob beim Einsatz der jeweiligen Dienste Profiling stattfindet, und ggf.
        Informationen über die involvierte Logik sowie die Tragweite und die angestrebten
        Auswirkungen einer derartigen Verarbeitung für Sie finden Sie in den weiterführenden
        Informationen über die von uns eingesetzten Dienste am Ende dieser Passage und unter den
        dort bereitgestellten Links.
      </p>
      <p>
        <u>Amazon CloudFront</u>
        <br /> Anbieter: Amazon Web Services, Inc., Vereinigte Staaten von Amerika.
        <br /> Website:{' '}
        <a href="https://aws.amazon.com/de/cloudfront/">https://aws.amazon.com/de/cloudfront/</a>
        <br /> Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://aws.amazon.com/de/legal/">https://aws.amazon.com/de/legal/</a>
        <br /> Garantie: EU-Standardvertragsklauseln. Eine Kopie der EU-Standardvertragsklauseln
        können Sie bei uns anfordern.
      </p>
      <p>
        <strong>Kontaktaufnahme</strong>
      </p>
      <p>
        Falls Sie mit uns Kontakt aufnehmen, verarbeiten wir Ihre personenbezogenen Daten, um Ihre
        Kontaktaufnahme zu bearbeiten.
      </p>
      <p>
        Falls wir Sie um Ihre Einwilligung gebeten und Sie diese erteilt haben, ist die
        Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. a DS-GVO. Falls wir Sie nicht um
        Ihre Einwilligung gebeten haben, ist die Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1
        lit. f DS-GVO. Unser berechtigtes Interesse ist dabei die Bearbeitung Ihrer Kontaktaufnahme.
        Falls die Verarbeitung zur Erfüllung eines Vertrags mit Ihnen oder zur Durchführung
        vorvertraglicher Maßnahmen aufgrund Ihrer Anfrage erforderlich ist, ist die Rechtsgrundlage
        für die Verarbeitung zudem Art. 6 Abs. 1 lit. b DS-GVO.
      </p>
      <p>
        Zur Bereitstellung und Pflege unserer E-Mail-Postfächer setzen wir externe Dienste ein.
        Diese Dienste können Zugriff auf personenbezogene Daten haben, die im Rahmen der
        Kontaktaufnahme mit uns verarbeitet werden. Weitere Informationen zu den eingesetzten
        Diensten, zum Umfang der Datenverarbeitung und zu den Technologien und Verfahren beim
        Einsatz der jeweiligen Dienste finden Sie nachfolgend in den weiterführenden Informationen
        über die von uns eingesetzten Dienste und unter den dort bereitgestellten Links:
      </p>
      <p>
        <u>Microsoft Exchange</u>
        <br /> Anbieter: Microsoft Corporation, Vereinigte Staaten von Amerika.
        <br /> Website:{' '}
        <a href="https://www.microsoft.com/de-de/microsoft-365/exchange/email">
          https://www.microsoft.com/de-de/microsoft-365/exchange/email
        </a>
        <br /> Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://privacy.microsoft.com/de-de/">https://privacy.microsoft.com/de-de/</a> und{' '}
        <a href="https://www.microsoft.com/de-de/trust-center/privacy">
          https://www.microsoft.com/de-de/trust-center/privacy
        </a>
        <br />
        Garantie: EU-Standardvertragsklauseln. Eine Kopie der EU-Standardvertragsklauseln können Sie
        bei uns anfordern.
      </p>
      <p>
        Zur Unterstützung der Abwicklung Ihrer Kontaktaufnahme nutzen wir Supportsysteme
        (Terminbuchungssysteme, Live Chats, Ticketsysteme bzw. Helpdesks etc.) und setzen dafür
        externe Dienste ein. Diese Dienste können Zugriff auf personenbezogene Daten haben, die im
        Rahmen der Kontaktaufnahme mit uns über ein Supportsystem verarbeitet werden. Weitere
        Informationen zu den eingesetzten Diensten, zum Umfang der Datenverarbeitung und zu den
        Technologien und Verfahren beim Einsatz der jeweiligen Dienste finden Sie nachfolgend in den
        weiterführenden Informationen über die von uns eingesetzten Dienste und unter den dort
        bereitgestellten Links:
      </p>
      <p>
        <u>Freshchat</u>
        <br /> Anbieter: Freshworks, Inc., Vereinigte Staaten von Amerika.
        <br /> Website:{' '}
        <a href="https://www.freshworks.com/live-chat-software/">
          https://www.freshworks.com/live-chat-software/
        </a>
        <br /> Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://www.freshworks.com/privacy/">https://www.freshworks.com/privacy/</a> und{' '}
        <a href="https://www.freshworks.com/security/">https://www.freshworks.com/security/</a>
        <br />
        Garantie: EU-Standardvertragsklauseln. Eine Kopie der EU-Standardvertragsklauseln können Sie
        bei uns anfordern.
      </p>
      <p>
        <u>Freshdesk</u>
        <br /> Anbieter: Freshworks, Inc., Vereinigte Staaten von Amerika.
        <br /> Website: <a href="https://freshdesk.com/de/">https://freshdesk.com/de/</a>
        <br /> Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://www.freshworks.com/de/datenschutz/">
          https://www.freshworks.com/de/datenschutz/
        </a>{' '}
        und{' '}
        <a href="https://www.freshworks.com/de/sicherheit/">
          https://www.freshworks.com/de/sicherheit/
        </a>
        <br />
        Garantie: EU-Standardvertragsklauseln. Eine Kopie der EU-Standardvertragsklauseln können Sie
        bei uns anfordern.
      </p>
      <p>
        <strong>Cookies &amp; ähnliche Technologien</strong>
      </p>
      <p>
        Es kommen Cookies zum Einsatz. Cookies sind Textinformationen, die auf Ihrem Endgerät
        gespeichert werden. Es wird zwischen Sitzungs-Cookies, die nach Schließen Ihres Browsers
        sofort gelöscht werden, und dauerhaften Cookies, die erst nach einer bestimmten Zeit
        gelöscht werden, unterschieden.
      </p>
      <p>
        Neben Cookies können auch ähnliche Technologien (Tracking-Pixel, Web-Beacons etc.) zum
        Einsatz kommen. Die nachfolgenden Ausführungen zu Cookies gelten insoweit auch für ähnliche
        Technologien. Ebenso gelten diese Ausführungen für die im Zusammenhang mit Cookies und
        ähnlichen Technologien stehenden weiteren Verarbeitungen (Analyse &amp; Marketing etc.).
        Dies gilt insbesondere auch für eine ggf. von Ihnen erteilte Einwilligung für den Einsatz
        von Cookies. Diese erstreckt sich zugleich auf andere Technologien und auf die im
        Zusammenhang mit Cookies und ähnlichen Technologien stehenden weiteren Verarbeitungen.
      </p>
      <p>
        Cookies können dazu dienen, die Nutzung bestimmter Funktionen zu ermöglichen. Cookies können
        auch dazu dienen, die Reichweite unseres Online-Angebots zu messen, dieses bedarfsgerecht
        und interessenbasiert zu gestalten und damit unser Online-Angebot und unser Marketing zu
        optimieren. Cookies können von uns und von externen Diensten eingesetzt werden.
      </p>
      <p>
        Falls wir Sie um Ihre Einwilligung gebeten und Sie diese erteilt haben, ist die
        Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. a DS-GVO. Falls wir Sie nicht um
        Ihre Einwilligung gebeten haben, ist die Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1
        lit. f DS-GVO. Je nach Zweck der Verarbeitung können unsere berechtigten Interessen den
        nachfolgenden Passagen entnommen werden.
      </p>
      <p>
        Sie können die Speicherung von Cookies durch eine entsprechende Einstellung Ihres Browsers
        verhindern. Nachfolgend stellen wir Ihnen für typische Browser Links zur Verfügung, unter
        denen Sie weitergehende Informationen zur Verwaltung von Cookie-Einstellungen finden können:
        <br /> - Firefox:{' '}
        <a href="https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen">
          https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen
        </a>
        <br /> - Chrome:{' '}
        <a href="https://support.google.com/chrome/bin/answer.py?hl=de&amp;hlrm=en&amp;answer=95647">
          https://support.google.com/chrome/bin/answer.py?hl=de&amp;hlrm=en&amp;answer=95647
        </a>
        <br /> - Internet Explorer / Edge:{' '}
        <a href="https://windows.microsoft.com/de-DE/windows-vista/Block-or-allow-cookies">
          https://windows.microsoft.com/de-DE/windows-vista/Block-or-allow-cookies
        </a>
        <br /> - Safari:{' '}
        <a href="https://support.apple.com/de-de/guide/safari/sfri11471/mac">
          https://support.apple.com/de-de/guide/safari/sfri11471/mac
        </a>
        <br /> - Opera:{' '}
        <a href="https://help.opera.com/de/latest/web-preferences/#cookies">
          https://help.opera.com/de/latest/web-preferences/#cookies
        </a>
        <br /> - Yandex:{' '}
        <a href="https://browser.yandex.com/help/personal-data-protection/cookies.html">
          https://browser.yandex.com/help/personal-data-protection/cookies.html
        </a>
      </p>
      <p>
        Weitere Widerspruchsmöglichkeiten finden Sie unter folgenden Links:{' '}
        <a href="https://www.youronlinechoices.eu/">https://www.youronlinechoices.eu/</a>,{' '}
        <a href="https://youradchoices.ca/en/tools">https://youradchoices.ca/en/tools</a>,{' '}
        <a href="https://optout.aboutads.info">https://optout.aboutads.info</a> und{' '}
        <a href="https://optout.networkadvertising.org/?c=1">
          https://optout.networkadvertising.org/?c=1
        </a>
        .
      </p>
      <p>
        Wenn Sie das Speichern von Cookies verhindern, kann dies die ordnungsgemäße Funktion unseres
        Online-Angebots beeinträchtigen. Wenn Sie alle Cookies löschen, gehen auch die o.g.
        Einstellungen verloren und müssen erneut vorgenommen werden.
      </p>
      <p>
        Des Weiteren können Sie die „Do-Not-Track“-Funktion Ihres Browsers aktivieren, um zu
        signalisieren, dass Sie nicht verfolgt werden möchten. Nachfolgend stellen wir Ihnen für
        typische Browser Links zur Verfügung, unter denen Sie weitergehende Informationen zu der
        Einstellung „Do-Not-Track“ finden können:
        <br /> - Firefox:{' '}
        <a href="https://support.mozilla.org/de/kb/wie-verhindere-ich-dass-websites-mich-verfolgen">
          https://support.mozilla.org/de/kb/wie-verhindere-ich-dass-websites-mich-verfolgen
        </a>
        <br /> - Chrome:{' '}
        <a href="https://support.google.com/chrome/answer/2790761?co=GENIE.Platform%3DDesktop&amp;hl=de">
          https://support.google.com/chrome/answer/2790761?co=GENIE.Platform%3DDesktop&amp;hl=de
        </a>
        <br /> - Internet Explorer / Edge:{' '}
        <a href="https://support.microsoft.com/de-de/help/17288/windows-internet-explorer-11-use-do-not-track">
          https://support.microsoft.com/de-de/help/17288/windows-internet-explorer-11-use-do-not-track
        </a>
        <br /> - Opera:{' '}
        <a href="https://help.opera.com/de/latest/security-and-privacy/">
          https://help.opera.com/de/latest/security-and-privacy/
        </a>
        <br /> - Safari unterstützt seit Februar 2019 die „Do-Not-Track“-Funktion nicht mehr. Unter
        folgendem Link kann in Safari websiteübergreifendes Tracking verhindert werden:{' '}
        <a href="https://support.apple.com/de-de/guide/safari/sfri40732/12.0/mac">
          https://support.apple.com/de-de/guide/safari/sfri40732/12.0/mac
        </a>
        <br /> - Yandex:{' '}
        <a href="https://browser.yandex.com/help/personal-data-protection/do-not-follow.html">
          https://browser.yandex.com/help/personal-data-protection/do-not-follow.html
        </a>
      </p>
      <p>
        <strong>Newsletter</strong>
      </p>
      <p>
        Falls wir Sie um Ihre Einwilligung gebeten und Sie diese erteilt haben, verarbeiten wir Ihre
        E-Mail-Adresse, um E-Mail-Marketing zu betreiben, und ggf. weitere personenbezogene Daten,
        um Sie dabei persönlich anzusprechen. Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1
        lit. a DS-GVO. Die Inhalte des E-Mail-Marketings werden bei der Einholung Ihrer Einwilligung
        konkret umschrieben. Im Übrigen enthält das E-Mail-Marketing Informationen zu uns, unseren
        Waren und Dienstleistungen.
      </p>
      <p>
        Wir verwenden das sogenannte Double-Opt-In-Verfahren, um einen möglichen Missbrauch Ihrer
        personenbezogenen Daten zu verhindern. Dazu senden wir Ihnen nach Erhebung Ihrer
        E-Mail-Adresse eine E-Mail an die von Ihnen angegebene E-Mail-Adresse, in der wir Sie um
        Bestätigung bitten, dass Sie das E-Mail-Marketing tatsächlich wünschen. Rechtsgrundlage für
        die Verarbeitung ist Art. 6 Abs. 1 lit. f DS-GVO. Unser berechtigtes Interesse ist dabei die
        rechtskonforme Durchführung des E-Mail-Marketings.
      </p>
      <p>
        Wir protokollieren den Zeitpunkt der Erteilung Ihrer Einwilligung und den Zeitpunkt Ihrer
        Bestätigung sowie Ihre IP-Adresse und den Inhalt Ihrer Einwilligungserklärung, um die
        rechtskonforme Einholung Ihrer Einwilligung nachweisen zu können. Rechtsgrundlage für die
        Verarbeitung ist Art. 6 Abs. 1 lit. f DS-GVO. Unser berechtigtes Interesse ist dabei die
        rechtskonforme Durchführung des E-Mail-Marketings.
      </p>
      <p>
        Für das E-Mail-Marketing setzen wir externe Dienste ein. Weitere Informationen zu den
        eingesetzten Diensten, zum Umfang der Datenverarbeitung und zu den Technologien und
        Verfahren beim Einsatz der jeweiligen Dienste sowie dazu, ob beim Einsatz der jeweiligen
        Dienste Profiling stattfindet, und ggf. Informationen über die involvierte Logik sowie die
        Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung für Sie finden Sie
        in den weiterführenden Informationen über die von uns eingesetzten Dienste am Ende dieser
        Passage und unter den dort bereitgestellten Links.
      </p>
      <p>
        Sie können Ihre Einwilligung jederzeit widerrufen. Durch den Widerruf Ihrer Einwilligung
        wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten
        Verarbeitung nicht berührt. Für den Widerruf Ihrer Einwilligung können Sie den dafür
        vorgesehenen Link in den E-Mails verwenden oder sich an uns unter den oben angegebenen
        Kontaktdaten wenden.
      </p>
      <p>
        Falls Sie Ihre Einwilligung widerrufen haben, behalten wir uns vor, Ihre personenbezogenen
        Daten in einer sogenannten Blacklist/Sperrliste zu verarbeiten, um zukünftig sicherstellen
        zu können, dass kein weiteres E-Mail-Marketing im Zusammenhang mit diesen personenbezogenen
        Daten erfolgt. Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. f DS-GVO. Unser
        berechtigtes Interesse ist dabei die Vermeidung von unerwünschtem E-Mail-Marketing.
      </p>
      <p>
        Wir verarbeiten Ihre personenbezogenen Daten im Rahmen von Tracking bzw. Erfolgsmessungen,
        um die Reichweite unseres E-Mail-Marketings zu messen, dieses bedarfsgerecht und
        interessenbasiert zu gestalten und damit unser E-Mail-Marketing zu optimieren. Dabei kann es
        auch zum Profiling (zu Zwecken der Werbung, personalisierten Information etc.) kommen. Das
        Profiling kann auch dienst- und geräteübergreifend erfolgen. Falls wir Sie um Ihre
        Einwilligung gebeten und Sie diese erteilt haben, ist die Rechtsgrundlage für die
        Verarbeitung Art. 6 Abs. 1 lit. a DS-GVO. Falls wir Sie nicht um Ihre Einwilligung gebeten
        haben, ist die Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. f DS-GVO. Unser
        berechtigtes Interesse ist dabei die Optimierung unseres E-Mail-Marketings. Ein getrennter
        Widerruf Ihrer Einwilligung oder Widerspruch in Bezug auf das Tracking bzw. die
        Erfolgsmessungen ist leider nicht möglich. Sie müssen die vorstehenden Möglichkeiten zum
        Widerruf Ihrer Einwilligung bzw. Widerspruch gegen die Verarbeitung Ihrer personenbezogenen
        Daten zum Zwecke des E-Mail-Marketings insgesamt nutzen.
      </p>
      <p>
        <u>Mailchimp</u>
        <br /> Anbieter: The Rocket Science Group, LLC, Vereinigte Staaten von Amerika.
        <br /> Website: <a href="https://mailchimp.com/de/">https://mailchimp.com/de/</a>
        <br /> Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://mailchimp.com/legal/">https://mailchimp.com/legal/</a>
        <br />
        Garantie: EU-Standardvertragsklauseln. Eine Kopie der EU-Standardvertragsklauseln können Sie
        bei uns anfordern.
      </p>
      <p>
        <strong>Analyse &amp; Marketing</strong>
      </p>
      <p>
        Wir verarbeiten Ihre personenbezogenen Daten, um die Reichweite unseres Online-Angebots zu
        messen, dieses bedarfsgerecht und interessenbasiert zu gestalten und damit unser
        Online-Angebot und unser Marketing zu optimieren.
      </p>
      <p>
        Falls wir Sie um Ihre Einwilligung gebeten und Sie diese erteilt haben, ist die
        Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. a DS-GVO. Falls wir Sie nicht um
        Ihre Einwilligung gebeten haben, ist die Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1
        lit. f DS-GVO. Unser berechtigtes Interesse ist dabei die Optimierung unseres
        Online-Angebots und unseres Marketings.
      </p>
      <p>
        Zur Analyse und zum Marketing setzen wir externe Dienste ein. Dabei kann es auch zum
        Profiling (zu Zwecken der Werbung, personalisierten Information etc.) kommen. Das Profiling
        kann auch dienst- und geräteübergreifend erfolgen. Weitere Informationen zu den eingesetzten
        Diensten, zum Umfang der Datenverarbeitung und zu den Technologien und Verfahren beim
        Einsatz der jeweiligen Dienste sowie dazu, ob beim Einsatz der jeweiligen Dienste Profiling
        stattfindet, und ggf. Informationen über die involvierte Logik sowie die Tragweite und die
        angestrebten Auswirkungen einer derartigen Verarbeitung für Sie finden Sie in den
        weiterführenden Informationen über die von uns eingesetzten Dienste am Ende dieser Passage
        und unter den dort bereitgestellten Links.
      </p>
      <p>
        Sie können die Speicherung von Cookies durch eine entsprechende Einstellung Ihres Browsers
        verhindern. Nachfolgend stellen wir Ihnen für typische Browser Links zur Verfügung, unter
        denen Sie weitergehende Informationen zur Verwaltung von Cookie-Einstellungen finden können:
        <br /> - Firefox:{' '}
        <a href="https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen">
          https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen
        </a>
        <br /> - Chrome:{' '}
        <a href="https://support.google.com/chrome/bin/answer.py?hl=de&amp;hlrm=en&amp;answer=95647">
          https://support.google.com/chrome/bin/answer.py?hl=de&amp;hlrm=en&amp;answer=95647
        </a>
        <br /> - Internet Explorer / Edge:{' '}
        <a href="https://windows.microsoft.com/de-DE/windows-vista/Block-or-allow-cookies">
          https://windows.microsoft.com/de-DE/windows-vista/Block-or-allow-cookies
        </a>
        <br /> - Safari:{' '}
        <a href="https://support.apple.com/de-de/guide/safari/sfri11471/mac">
          https://support.apple.com/de-de/guide/safari/sfri11471/mac
        </a>
        <br /> - Opera:{' '}
        <a href="https://help.opera.com/de/latest/web-preferences/#cookies">
          https://help.opera.com/de/latest/web-preferences/#cookies
        </a>
        <br /> - Yandex:{' '}
        <a href="https://browser.yandex.com/help/personal-data-protection/cookies.html">
          https://browser.yandex.com/help/personal-data-protection/cookies.html
        </a>
      </p>
      <p>
        Weitere Widerspruchsmöglichkeiten finden Sie unter folgenden Links:{' '}
        <a href="https://www.youronlinechoices.eu/">https://www.youronlinechoices.eu/</a>,{' '}
        <a href="https://youradchoices.ca/en/tools">https://youradchoices.ca/en/tools</a>,{' '}
        <a href="https://optout.aboutads.info">https://optout.aboutads.info</a> und{' '}
        <a href="https://optout.networkadvertising.org/?c=1">
          https://optout.networkadvertising.org/?c=1
        </a>
        .
      </p>
      <p>
        Wenn Sie das Speichern von Cookies verhindern, kann dies die ordnungsgemäße Funktion unseres
        Online-Angebots beeinträchtigen. Wenn Sie alle Cookies löschen, gehen auch die o.g.
        Einstellungen verloren und müssen erneut vorgenommen werden.
      </p>
      <p>
        Des Weiteren können Sie die „Do-Not-Track“-Funktion Ihres Browsers aktivieren, um zu
        signalisieren, dass Sie nicht verfolgt werden möchten. Nachfolgend stellen wir Ihnen für
        typische Browser Links zur Verfügung, unter denen Sie weitergehende Informationen zu der
        Einstellung „Do-Not-Track“ finden können:
        <br /> - Firefox:{' '}
        <a href="https://support.mozilla.org/de/kb/wie-verhindere-ich-dass-websites-mich-verfolgen">
          https://support.mozilla.org/de/kb/wie-verhindere-ich-dass-websites-mich-verfolgen
        </a>
        <br /> - Chrome:{' '}
        <a href="https://support.google.com/chrome/answer/2790761?co=GENIE.Platform%3DDesktop&hl=de">
          https://support.google.com/chrome/answer/2790761?co=GENIE.Platform%3DDesktop&hl=de
        </a>
        <br /> - Internet Explorer / Edge:{' '}
        <a href="https://support.microsoft.com/de-de/help/17288/windows-internet-explorer-11-use-do-not-track">
          https://support.microsoft.com/de-de/help/17288/windows-internet-explorer-11-use-do-not-track
        </a>
        <br /> - Opera:{' '}
        <a href="https://help.opera.com/de/latest/security-and-privacy/">
          https://help.opera.com/de/latest/security-and-privacy/
        </a>
        <br /> - Safari unterstützt seit Februar 2019 die „Do-Not-Track“-Funktion nicht mehr. Unter
        folgendem Link kann in Safari websiteübergreifendes Tracking verhindert werden:{' '}
        <a href="https://support.apple.com/de-de/guide/safari/sfri40732/12.0/mac">
          https://support.apple.com/de-de/guide/safari/sfri40732/12.0/mac
        </a>
        <br /> - Yandex:{' '}
        <a href="https://browser.yandex.com/help/personal-data-protection/do-not-follow.html">
          https://browser.yandex.com/help/personal-data-protection/do-not-follow.html
        </a>
      </p>
      <p>
        <u>Facebook-Pixel mit Custom Audiences und erweitertem Datenabgleich </u>
        <br />
        Anbieter: Facebook Ireland Limited, Irland. Die Facebook Ireland Limited ist eine
        Tochtergesellschaft der Facebook, Inc., Vereinigte Staaten von Amerika. <br />
        Website:{' '}
        <a href="https://www.facebook.com/business/help/744354708981227?id=2469097953376494">
          https://www.facebook.com/business/help/744354708981227?id=2469097953376494
        </a>
        <br />
        Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://www.facebook.com/business/help/742478679120153?id=1205376682832142&amp;recommended_by=218844828315224">
          https://www.facebook.com/business/help/742478679120153?id=1205376682832142&amp;recommended_by=218844828315224
        </a>
        ,{' '}
        <a href="https://www.facebook.com/business/help/1474662202748341?id=2469097953376494&amp;locale=de_DE">
          https://www.facebook.com/business/help/1474662202748341?id=2469097953376494&amp;locale=de_DE
        </a>
        ,{' '}
        <a href="https://de-de.facebook.com/business/help/611774685654668">
          https://de-de.facebook.com/business/help/611774685654668
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
        und{' '}
        <a href="https://de-de.facebook.com/help/568137493302217">
          https://de-de.facebook.com/help/568137493302217
        </a>
      </p>
      <p>
        <u>Google Ads Conversion-Tracking </u>
        <br />
        Anbieter: Im Europäischen Wirtschaftsraum (EWR) und der Schweiz werden Google-Dienste von
        der Google Ireland Limited, Irland, angeboten. Die Google Ireland Limited ist eine
        Tochtergesellschaft der Google LLC, Vereinigte Staaten von Amerika. <br />
        Website:{' '}
        <a href="https://ads.google.com/intl/de_de/home/">
          https://ads.google.com/intl/de_de/home/
        </a>
        <br />
        Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        Die Übermittlung von personenbezogenen Daten in Drittländer erfolgt abhängig vom jeweiligen
        Google-Dienst und unter Geltung der verschiedenen EU-Standardvertragsklauseln, sofern diese
        von Google angeboten werden. Weitere Informationen hierzu und der Verantwortlichkeit von
        Google finden Sie unter folgendem Link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>.
        Eine Kopie der EU-Standardvertragsklauseln können Sie dort einsehen.
      </p>
      <p>
        <u>Google AdSense </u>
        <br />
        Anbieter: Im Europäischen Wirtschaftsraum (EWR) und der Schweiz werden Google-Dienste von
        der Google Ireland Limited, Irland, angeboten. Die Google Ireland Limited ist eine
        Tochtergesellschaft der Google LLC, Vereinigte Staaten von Amerika. <br />
        Website:{' '}
        <a href="https://www.google.com/intl/de_de/adsense/start/">
          https://www.google.com/intl/de_de/adsense/start/
        </a>
        <br />
        Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        Die Übermittlung von personenbezogenen Daten in Drittländer erfolgt abhängig vom jeweiligen
        Google-Dienst und unter Geltung der verschiedenen EU-Standardvertragsklauseln, sofern diese
        von Google angeboten werden. Weitere Informationen hierzu und der Verantwortlichkeit von
        Google finden Sie unter folgendem Link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>.
        Eine Kopie der EU-Standardvertragsklauseln können Sie dort einsehen.
      </p>
      <p>
        <u>Google Analytics </u>
        <br />
        Anbieter: Im Europäischen Wirtschaftsraum (EWR) und der Schweiz werden Google-Dienste von
        der Google Ireland Limited, Irland, angeboten. Die Google Ireland Limited ist eine
        Tochtergesellschaft der Google LLC, Vereinigte Staaten von Amerika. <br />
        Website:{' '}
        <a href="https://marketingplatform.google.com/intl/de/about/analytics/">
          https://marketingplatform.google.com/intl/de/about/analytics/
        </a>
        <br />
        Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://support.google.com/analytics/answer/6004245?hl=de">
          https://support.google.com/analytics/answer/6004245?hl=de
        </a>{' '}
        und <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        Die Übermittlung von personenbezogenen Daten in Drittländer erfolgt abhängig vom jeweiligen
        Google-Dienst und unter Geltung der verschiedenen EU-Standardvertragsklauseln, sofern diese
        von Google angeboten werden. Weitere Informationen hierzu und der Verantwortlichkeit von
        Google finden Sie unter folgendem Link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>.
        Eine Kopie der EU-Standardvertragsklauseln können Sie dort einsehen.
      </p>
      <p>
        <u>Google Analytics 360 </u>
        <br />
        Anbieter: Im Europäischen Wirtschaftsraum (EWR) und der Schweiz werden Google-Dienste von
        der Google Ireland Limited, Gordon House, Irland, angeboten. Die Google Ireland Limited ist
        eine Tochtergesellschaft der Google LLC, Vereinigte Staaten von Amerika. <br />
        Website:{' '}
        <a href="https://marketingplatform.google.com/about/analytics-360/">
          https://marketingplatform.google.com/about/analytics-360/
        </a>
        <br />
        Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://support.google.com/analytics/answer/6004245?hl=de">
          https://support.google.com/analytics/answer/6004245?hl=de
        </a>{' '}
        und <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        Die Übermittlung von personenbezogenen Daten in Drittländer erfolgt abhängig vom jeweiligen
        Google-Dienst und unter Geltung der verschiedenen EU-Standardvertragsklauseln, sofern diese
        von Google angeboten werden. Weitere Informationen hierzu und der Verantwortlichkeit von
        Google finden Sie unter folgendem Link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>.
        Eine Kopie der EU-Standardvertragsklauseln können Sie dort einsehen.
      </p>
      <p>
        <u>Google Optimize </u>
        <br />
        Anbieter: Im Europäischen Wirtschaftsraum (EWR) und der Schweiz werden Google-Dienste von
        der Google Ireland Limited, Irland, angeboten. Die Google Ireland Limited ist eine
        Tochtergesellschaft der Google LLC, Vereinigte Staaten von Amerika. <br />
        Website:{' '}
        <a href="https://marketingplatform.google.com/intl/de/about/optimize/">
          https://marketingplatform.google.com/intl/de/about/optimize/
        </a>
        <br />
        Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://support.google.com/analytics/answer/6004245?hl=de">
          https://support.google.com/analytics/answer/6004245?hl=de
        </a>{' '}
        und <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        Die Übermittlung von personenbezogenen Daten in Drittländer erfolgt abhängig vom jeweiligen
        Google-Dienst und unter Geltung der verschiedenen EU-Standardvertragsklauseln, sofern diese
        von Google angeboten werden. Weitere Informationen hierzu und der Verantwortlichkeit von
        Google finden Sie unter folgendem Link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>.
        Eine Kopie der EU-Standardvertragsklauseln können Sie dort einsehen.
      </p>
      <p>
        <u>Google Remarketing </u>
        <br />
        Anbieter: Im Europäischen Wirtschaftsraum (EWR) und der Schweiz werden Google-Dienste von
        der Google Ireland Limited, Irland, angeboten. Die Google Ireland Limited ist eine
        Tochtergesellschaft der Google LLC, Vereinigte Staaten von Amerika. <br />
        Website:{' '}
        <a href="https://support.google.com/google-ads/answer/2453998">
          https://support.google.com/google-ads/answer/2453998
        </a>
        <br />
        Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        Die Übermittlung von personenbezogenen Daten in Drittländer erfolgt abhängig vom jeweiligen
        Google-Dienst und unter Geltung der verschiedenen EU-Standardvertragsklauseln, sofern diese
        von Google angeboten werden. Weitere Informationen hierzu und der Verantwortlichkeit von
        Google finden Sie unter folgendem Link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>.
        Eine Kopie der EU-Standardvertragsklauseln können Sie dort einsehen.
      </p>
      <p>
        <u>Google Search Ads 360 </u>
        <br />
        Anbieter: Im Europäischen Wirtschaftsraum (EWR) und der Schweiz werden Google-Dienste von
        der Google Ireland Limited, Irland, angeboten. Die Google Ireland Limited ist eine
        Tochtergesellschaft der Google LLC, Vereinigte Staaten von Amerika. <br />
        Website:{' '}
        <a href="https://marketingplatform.google.com/intl/de/about/search-ads-360/">
          https://marketingplatform.google.com/intl/de/about/search-ads-360/
        </a>
        <br />
        Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        Die Übermittlung von personenbezogenen Daten in Drittländer erfolgt abhängig vom jeweiligen
        Google-Dienst und unter Geltung der verschiedenen EU-Standardvertragsklauseln, sofern diese
        von Google angeboten werden. Weitere Informationen hierzu und der Verantwortlichkeit von
        Google finden Sie unter folgendem Link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>.
        Eine Kopie der EU-Standardvertragsklauseln können Sie dort einsehen.
      </p>
      <p>
        <u>Google Signals </u>
        <br />
        Anbieter: Im Europäischen Wirtschaftsraum (EWR) und der Schweiz werden Google-Dienste von
        der Google Ireland Limited, Irland, angeboten. Die Google Ireland Limited ist eine
        Tochtergesellschaft der Google LLC, Vereinigte Staaten von Amerika. <br />
        Website:{' '}
        <a href="https://support.google.com/analytics/answer/7532985?hl=de">
          https://support.google.com/analytics/answer/7532985?hl=de
        </a>
        <br />
        Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://support.google.com/analytics/answer/6004245?hl=de">
          https://support.google.com/analytics/answer/6004245?hl=de
        </a>{' '}
        und <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        Die Übermittlung von personenbezogenen Daten in Drittländer erfolgt abhängig vom jeweiligen
        Google-Dienst und unter Geltung der verschiedenen EU-Standardvertragsklauseln, sofern diese
        von Google angeboten werden. Weitere Informationen hierzu und der Verantwortlichkeit von
        Google finden Sie unter folgendem Link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>.
        Eine Kopie der EU-Standardvertragsklauseln können Sie dort einsehen.
      </p>
      <p>
        <u>Google Tag Manager </u>
        <br />
        Anbieter: Im Europäischen Wirtschaftsraum (EWR) und der Schweiz werden Google-Dienste von
        der Google Ireland Limited, Irland, angeboten. Die Google Ireland Limited ist eine
        Tochtergesellschaft der Google LLC, Vereinigte Staaten von Amerika. <br />
        Website:{' '}
        <a href="https://support.google.com/tagmanager/answer/6102821?hl=de">
          https://support.google.com/tagmanager/answer/6102821?hl=de
        </a>
        <br />
        Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        Die Übermittlung von personenbezogenen Daten in Drittländer erfolgt abhängig vom jeweiligen
        Google-Dienst und unter Geltung der verschiedenen EU-Standardvertragsklauseln, sofern diese
        von Google angeboten werden. Weitere Informationen hierzu und der Verantwortlichkeit von
        Google finden Sie unter folgendem Link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>.
        Eine Kopie der EU-Standardvertragsklauseln können Sie dort einsehen.
      </p>
      <p>
        <u>Google Universal Analytics </u>
        <br />
        Anbieter: Im Europäischen Wirtschaftsraum (EWR) und der Schweiz werden Google-Dienste von
        der Google Ireland Limited, Irland, angeboten. Die Google Ireland Limited ist eine
        Tochtergesellschaft der Google LLC, Vereinigte Staaten von Amerika. <br />
        Website:{' '}
        <a href="https://support.google.com/analytics/answer/2790010?hl=de">
          https://support.google.com/analytics/answer/2790010?hl=de
        </a>
        <br />
        Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://support.google.com/analytics/answer/6004245?hl=de">
          https://support.google.com/analytics/answer/6004245?hl=de
        </a>{' '}
        und <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br />
        Die Übermittlung von personenbezogenen Daten in Drittländer erfolgt abhängig vom jeweiligen
        Google-Dienst und unter Geltung der verschiedenen EU-Standardvertragsklauseln, sofern diese
        von Google angeboten werden. Weitere Informationen hierzu und der Verantwortlichkeit von
        Google finden Sie unter folgendem Link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>.
        Eine Kopie der EU-Standardvertragsklauseln können Sie dort einsehen.
      </p>
      <p>
        <u>Hotjar </u>
        <br />
        Anbieter: Hotjar Limited, Malta. <br />
        Website: <a href="https://www.hotjar.com/">https://www.hotjar.com/</a>
        <br />
        Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://www.hotjar.com/legal/policies/privacy/">
          https://www.hotjar.com/legal/policies/privacy/
        </a>
      </p>
      <p>
        <u>Mailchimp</u>
        <br /> Anbieter: The Rocket Science Group, LLC, Vereinigte Staaten von Amerika.
        <br /> Website: <a href="https://mailchimp.com/de/">https://mailchimp.com/de/</a>
        <br /> Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://mailchimp.com/legal/">https://mailchimp.com/legal/</a>
        <br />
        Garantie: EU-Standardvertragsklauseln. Eine Kopie der EU-Standardvertragsklauseln können Sie
        bei uns anfordern.
      </p>
      <p>
        <strong>Social-Media-Präsenzen</strong>
      </p>
      <p>
        Wir unterhalten Social-Media-Präsenzen bei externen Diensten, um dort mit Nutzern
        kommunizieren zu können und damit unser Online-Angebot und unser Marketing zu optimieren.
      </p>
      <p>
        Diese Datenschutzerklärung gilt auch für folgende Social-Media-Präsenzen: <br />
        https://www.facebook.com/test
      </p>
      <p>
        Falls wir Sie um Ihre Einwilligung gebeten und Sie diese erteilt haben, ist die
        Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. a DS-GVO. Falls wir Sie nicht um
        Ihre Einwilligung gebeten haben, ist die Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1
        lit. f DS-GVO. Unser berechtigtes Interesse ist dabei die Optimierung unseres
        Online-Angebots und unseres Marketings.
      </p>
      <p>
        Im Rahmen der Nutzung der externen Dienste kann es auch zum Profiling (zu Zwecken der
        Werbung, personalisierten Information etc.) kommen. Das Profiling kann auch dienst- und
        geräteübergreifend erfolgen. Weitere Informationen zu den eingesetzten Diensten, zum Umfang
        der Datenverarbeitung und zu den Technologien und Verfahren beim Einsatz der jeweiligen
        Dienste sowie dazu, ob beim Einsatz der jeweiligen Dienste Profiling stattfindet, und ggf.
        Informationen über die involvierte Logik sowie die Tragweite und die angestrebten
        Auswirkungen einer derartigen Verarbeitung für Sie finden Sie in den weiterführenden
        Informationen über die von uns eingesetzten Dienste am Ende dieser Passage und unter den
        dort bereitgestellten Links.
      </p>
      <p>
        <u>Facebook</u>
        <br /> Anbieter: Facebook Ireland Limited, Irland. Die Facebook Ireland Limited ist eine
        Tochtergesellschaft der Facebook, Inc., Vereinigte Staaten von Amerika.
        <br /> Website: <a href="https://www.facebook.com">https://www.facebook.com</a>
        <br /> Der Anbieter und wir sind gemeinsam Verantwortliche. Wir haben mit dem Anbieter eine
        entsprechende Vereinbarung geschlossen. Eine Kopie der Vereinbarung können Sie bei uns
        anfordern.
        <br /> Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://developers.facebook.com/docs/plugins/">
          https://developers.facebook.com/docs/plugins/
        </a>
        ,{' '}
        <a href="https://www.facebook.com/legal/terms/information_about_page_insights_data">
          https://www.facebook.com/legal/terms/information_about_page_insights_data
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
        und{' '}
        <a href="https://de-de.facebook.com/help/568137493302217">
          https://de-de.facebook.com/help/568137493302217
        </a>
      </p>
      <p>
        <u>Instagram</u>
        <br /> Anbieter: Facebook Ireland Limited, Irland. Die Facebook Ireland Limited ist eine
        Tochtergesellschaft der Facebook, Inc., Vereinigte Staaten von Amerika.
        <br /> Website: <a href="https://www.instagram.com">https://www.instagram.com</a>
        <br /> Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://help.instagram.com/581066165581870">
          https://help.instagram.com/581066165581870
        </a>{' '}
        und{' '}
        <a href="https://help.instagram.com/519522125107875">
          https://help.instagram.com/519522125107875
        </a>
      </p>
      <p>
        <u>LinkedIn</u>
        <br /> Anbieter: Wenn Sie sich in der EU, im Europäischen Wirtschaftsraum (EWR) oder der
        Schweiz befinden, wird dieser Dienst von der LinkedIn Ireland Unlimited Company, Irland,
        angeboten. Wenn Sie sich außerhalb der EU, des Europäischen Wirtschaftsraums (EWR) oder der
        Schweiz befinden, wird dieser Dienst von der LinkedIn Corporation, Vereinigte Staaten von
        Amerika, angeboten.
        <br /> Website: <a href="https://www.linkedin.com">https://www.linkedin.com</a>
        <br /> Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://de.linkedin.com/legal/privacy-policy?trk=homepage-basic_footer-privacy-policy">
          https://de.linkedin.com/legal/privacy-policy?trk=homepage-basic_footer-privacy-policy
        </a>{' '}
        und{' '}
        <a href="https://de.linkedin.com/legal/cookie-policy?trk=homepage-basic_footer-cookie-policy">
          https://de.linkedin.com/legal/cookie-policy?trk=homepage-basic_footer-cookie-policy
        </a>
        <br /> Garantie: EU-Standardvertragsklauseln. Eine Kopie der EU-Standardvertragsklauseln
        können Sie bei uns anfordern.
      </p>
      <p>
        <u>TikTok</u>
        <br /> Anbieter: Für Nutzer im EWR und in der Schweiz ist der Dienstanbieter die TikTok
        Technology Limited, Irland. Für Nutzer in Großbritannien ist der Dienstanbieter die TikTok
        Information Technologies UK Limited, Vereinigtes Königreich. Im Übrigen ist der
        Dienstanbieter die TikTok Inc., Vereinigte Staaten von Amerika.
        <br /> Website: <a href="https://www.tiktok.com">https://www.tiktok.com</a>
        <br /> Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://www.tiktok.com/legal/privacy-policy?lang=de">
          https://www.tiktok.com/legal/privacy-policy?lang=de
        </a>
      </p>
      <p>
        <u>YouTube</u>
        <br /> Anbieter: Im Europäischen Wirtschaftsraum (EWR) und der Schweiz werden Google-Dienste
        von der Google Ireland Limited, Irland, angeboten. Die Google Ireland Limited ist eine
        Tochtergesellschaft der Google LLC, Vereinigte Staaten von Amerika.
        <br /> Website: <a href="https://www.youtube.de">https://www.youtube.de</a>
        <br /> Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br /> Die Übermittlung von personenbezogenen Daten in Drittländer erfolgt abhängig vom
        jeweiligen Google-Dienst und unter Geltung der verschiedenen EU-Standardvertragsklauseln,
        sofern diese von Google angeboten werden. Weitere Informationen hierzu und der
        Verantwortlichkeit von Google finden Sie unter folgendem Link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>.
        Eine Kopie der EU-Standardvertragsklauseln können Sie dort einsehen.
      </p>
      <p>
        <strong>Schriftarten &amp; Skripte</strong>
      </p>
      <p>
        Wir verwenden Schriftarten und Skripte von externen Diensten, um Ihnen unser Online-Angebot
        anzeigen zu können und stets aktuelle Schriftarten und Skripte zu gewährleisten.
      </p>
      <p>
        Falls wir Sie um Ihre Einwilligung gebeten und Sie diese erteilt haben, ist die
        Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. a DS-GVO. Falls wir Sie nicht um
        Ihre Einwilligung gebeten haben, ist die Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1
        lit. f DS-GVO. Unser berechtigtes Interesse ist dabei die ordnungsgemäße Anzeige unseres
        Online-Angebots und die Gewährleistung von aktuellen Schriftarten und Skripten.
      </p>
      <p>
        Im Rahmen der Nutzung der externen Dienste kann es auch zum Profiling (zu Zwecken der
        Werbung, personalisierten Information etc.) kommen. Das Profiling kann auch dienst- und
        geräteübergreifend erfolgen. Weitere Informationen zu den eingesetzten Diensten, zum Umfang
        der Datenverarbeitung und zu den Technologien und Verfahren beim Einsatz der jeweiligen
        Dienste sowie dazu, ob beim Einsatz der jeweiligen Dienste Profiling stattfindet, und ggf.
        Informationen über die involvierte Logik sowie die Tragweite und die angestrebten
        Auswirkungen einer derartigen Verarbeitung für Sie finden Sie in den weiterführenden
        Informationen über die von uns eingesetzten Dienste am Ende dieser Passage und unter den
        dort bereitgestellten Links.
      </p>
      <p>
        <strong>Karten</strong>
      </p>
      <p>
        Wir nutzen Karten von externen Diensten, um Ihnen die Bestimmung unseres Standortes zu
        erleichtern und die Nutzung der weiteren Funktionen dieser externen Dienste im Zusammenhang
        mit den Karten zu ermöglichen.
      </p>
      <p>
        Falls wir Sie um Ihre Einwilligung gebeten und Sie diese erteilt haben, ist die
        Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. a DS-GVO. Falls wir Sie nicht um
        Ihre Einwilligung gebeten haben, ist die Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1
        lit. f DS-GVO. Unser berechtigtes Interesse ist dabei die vereinfachte Nutzung von Karten.
      </p>
      <p>
        Im Rahmen der Nutzung der externen Dienste kann es auch zum Profiling (zu Zwecken der
        Werbung, personalisierten Information etc.) kommen. Das Profiling kann auch dienst- und
        geräteübergreifend erfolgen. Weitere Informationen zu den eingesetzten Diensten, zum Umfang
        der Datenverarbeitung und zu den Technologien und Verfahren beim Einsatz der jeweiligen
        Dienste sowie dazu, ob beim Einsatz der jeweiligen Dienste Profiling stattfindet, und ggf.
        Informationen über die involvierte Logik sowie die Tragweite und die angestrebten
        Auswirkungen einer derartigen Verarbeitung für Sie finden Sie in den weiterführenden
        Informationen über die von uns eingesetzten Dienste am Ende dieser Passage und unter den
        dort bereitgestellten Links.
      </p>
      <p>
        <u>Google Maps</u>
        <br /> Anbieter: Im Europäischen Wirtschaftsraum (EWR) und der Schweiz werden Google-Dienste
        von der Google Ireland Limited, Irland, angeboten. Die Google Ireland Limited ist eine
        Tochtergesellschaft der Google LLC, Vereinigte Staaten von Amerika.
        <br /> Website: <a href="https://www.google.de/maps">https://www.google.de/maps</a>
        <br /> Weitere Informationen &amp; Datenschutz:{' '}
        <a href="https://policies.google.com/?hl=de">https://policies.google.com/?hl=de</a>
        <br /> Die Übermittlung von personenbezogenen Daten in Drittländer erfolgt abhängig vom
        jeweiligen Google-Dienst und unter Geltung der verschiedenen EU-Standardvertragsklauseln,
        sofern diese von Google angeboten werden. Weitere Informationen hierzu und der
        Verantwortlichkeit von Google finden Sie unter folgendem Link:{' '}
        <a href="https://business.safety.google/gdpr/">https://business.safety.google/gdpr/</a>.
        Eine Kopie der EU-Standardvertragsklauseln können Sie dort einsehen.
      </p>
      <p>&nbsp;</p>
      <p>
        Diese Datenschutzerklärung wurde mit dem Konfigurator von{' '}
        <a href="https://www.getlaw.de" title="getLaw.de">
          getLaw.de
        </a>{' '}
        erstellt.
      </p>
    </Content>
  );
};

export default DePrivacyPolicy;
